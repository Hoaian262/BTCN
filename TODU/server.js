require('dotenv').config();
const express=require('express'), mysql=require('mysql2/promise'), path=require('path');
const app=express();
const db=mysql.createPool({host:process.env.DB_HOST||'localhost',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD,database:process.env.DB_NAME||'todu',dateStrings:true});
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
const route=fn=>(req,res,next)=>Promise.resolve(fn(req,res)).catch(next);
app.get('/api/categories',route(async(req,res)=>res.json((await db.query('SELECT * FROM categories'))[0])));
app.post('/api/categories', route(async (req, res) => {
  const {name, color} = req.body ?? {};
  const cleanName = typeof name === 'string' ? name.trim() : '';
  if (!cleanName || Array.from(cleanName).length > 50 ||
      typeof color !== 'string' || !/^#[0-9a-f]{6}$/i.test(color)) {
    return res.status(400).json({error: 'Invalid category name or color'});
  }
  try {
    const [result] = await db.execute('INSERT INTO categories (name, color) VALUES (?, ?)', [cleanName, color]);
    res.status(201).json({id: result.insertId, name: cleanName, color});
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({error: 'Category name already exists'});
    throw err;
  }
}));
app.get('/api/tasks',route(async(req,res)=>res.json((await db.query('SELECT * FROM tasks ORDER BY due_date,due_time,id'))[0])));
function valid(b){return typeof b.title==='string'&&b.title.trim().length>0&&b.title.length<=200&&typeof b.due_date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(b.due_date)&&(!b.due_time||/^\d{2}:\d{2}(:\d{2})?$/.test(b.due_time))&&Number.isInteger(Number(b.category_id))&&['low','medium','high'].includes(b.priority)&&['pending','progress','completed'].includes(b.status);}
function values(b){return [b.title.trim(),String(b.description||''),Number(b.category_id),b.due_date,b.due_time||null,b.priority,b.status];}
app.post('/api/tasks',route(async(req,res)=>{let b=req.body;if(!valid(b))return res.status(400).json({error:'Invalid task data'});let [r]=await db.execute("INSERT INTO tasks(title,description,category_id,due_date,due_time,priority,status,completed_at) VALUES(?,?,?,?,?,?,?,IF(?='completed',NOW(),NULL))",[...values(b),b.status]);res.status(201).json({id:r.insertId});}));
app.put('/api/tasks/:id',route(async(req,res)=>{let b=req.body;if(!valid(b))return res.status(400).json({error:'Invalid task data'});let [r]=await db.execute("UPDATE tasks SET title=?,description=?,category_id=?,due_date=?,due_time=?,priority=?,status=?,completed_at=IF(?='completed',COALESCE(completed_at,NOW()),NULL) WHERE id=?",[...values(b),b.status,req.params.id]);res.status(r.affectedRows?200:404).json({ok:!!r.affectedRows});}));
app.delete('/api/tasks/:id',route(async(req,res)=>{let [r]=await db.execute('DELETE FROM tasks WHERE id=?',[req.params.id]);res.status(r.affectedRows?200:404).json({ok:!!r.affectedRows});}));
app.use((err,req,res,next)=>{console.error(err.message);res.status(500).json({error:'Database request failed. Check MySQL configuration.'});});
app.listen(Number(process.env.PORT||3000),'127.0.0.1',()=>console.log('TODU: http://localhost:'+(process.env.PORT||3000)));
