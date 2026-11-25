const $=id=>document.getElementById(id), tr=(en,vi)=>lang==='vi'?vi:en;
let lang=localStorage.getItem('todu-lang')||'en', tasks=[], categories=[], page='today', search='', status='all', priority='all', category='all', selected=null, calendarView='month', chosen=null;
const dateKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const today=()=>dateKey(new Date()), offset=n=>{let d=new Date();d.setDate(d.getDate()+n);return dateKey(d)};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const names=()=>({overview:tr('Overview','Tổng quan'),today:tr('Today','Hôm nay'),upcoming:tr('Upcoming','Sắp tới'),calendar:tr('Calendar','Lịch')});
const statusName=s=>({pending:tr('Pending','Chưa làm'),progress:tr('In progress','Đang làm'),completed:tr('Completed','Hoàn thành')})[s];
const priorityName=s=>({low:tr('Low','Thấp'),medium:tr('Medium','Vừa'),high:tr('High','Cao')})[s];
const catName=c=>({Study:tr('Study','Học tập'),Work:tr('Work','Công việc'),Personal:tr('Personal','Cá nhân')})[c?.name]||c?.name||'';
async function api(url,method='GET',body){let r=await fetch('/api/'+url,{method,headers:{'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});if(!r.ok)throw Object.assign(Error((await r.json()).error||r.status), {status:r.status});return r.json()}
function error(e){$('error').textContent=tr('Request failed: ','Lỗi xử lý: ')+e.message}
async function load(){try{[tasks,categories]=await Promise.all([api('tasks'),api('categories')]);$('error').textContent='';render()}catch(e){error(e)}}
function navigate(p){page=p;resetTaskFilters();chosen=null;render()}
const pageIcons = {
  overview: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  today: '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12 2.3 2.3 4.7-4.7"/>',
  upcoming: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  calendar: '<rect x="3.5" y="5.5" width="17" height="15" rx="2.5"/><path d="M7.5 3.5v4m9-4v4M4 10h16M8 14h2m4 0h2m-8 3h2"/>',
};

function navigation() {
  return Object.entries(names()).map(([key, label]) => {
    const current = page === key ? ' aria-current="page"' : '';
    return '<button data-page="' + key + '"' + current + '>' +
      '<span class="page-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" focusable="false">' +
      pageIcons[key] + '</svg></span><span>' + label + '</span></button>';
  }).join('');
}

function render(){hideTaskPreview();document.documentElement.lang=lang;$('date').textContent=new Date().toLocaleDateString(lang==='vi'?'vi-VN':'en-US',{weekday:'long',day:'numeric',month:'long',year:'numeric'});$('heading').textContent=names()[page];$('add').textContent=tr('+ New task','+ Thêm việc');$('add-category').textContent=tr('+ Category','+ Danh mục');$('language').textContent=lang==='vi'?'VI / EN':'EN / VI';$('nav').innerHTML=navigation();$('lists').innerHTML=`<small>${tr('MY LISTS','DANH MỤC')}</small>`+categories.map(c=>`<button data-cat="${c.id}" class="${category==c.id?'active':''}"><i class="dot" style="background:${categoryColor(c)}"></i>${esc(catName(c))}</button>`).join('');$('content').innerHTML=page==='overview'?overview():page==='calendar'?calendar():`${page==='today'?goals():''}${taskSection()}`;}
function goals(){let a=tasks.filter(t=>t.due_date===today()), n=a.filter(t=>t.status==='completed').length,p=a.length?Math.round(n/a.length*100):0;let streak=0;for(let i=0;i<366;i++){if(tasks.some(t=>t.completed_at?.slice(0,10)===offset(-i)))streak++;else if(i!==0)break;}return `<div class="bento"><div class="card dark"><h2>${tr('Daily goal','Mục tiêu mỗi ngày')}</h2><div class="streak"><span class="streak-flame ${streak ? 'is-lit' : ''}" aria-hidden="true"><span>&#128293;</span></span><span>${streak} ${tr('day streak','ngày liên tiếp')}</span></div><div class="week">${Array.from({length:7},(_,i)=>{let d=new Date();d.setDate(d.getDate()-((d.getDay()+6)%7)+i);let done=tasks.some(t=>t.completed_at?.slice(0,10)===dateKey(d));return `<div class="day ${done?'done':''}"><b>${done?'✓':'·'}</b>${d.toLocaleDateString(lang==='vi'?'vi-VN':'en',{weekday:'short'})}</div>`}).join('')}</div></div><div class="card green"><h2>${tr("Today's progress",'Tiến độ hôm nay')}</h2><div class="big">${p}%</div>${n}/${a.length} ${tr('tasks completed','việc hoàn thành')}<div class="track"><i style="width:${p}%"></i></div></div></div>`}
function options(items,value){return items.map(([k,v])=>`<option value="${esc(k)}" ${String(k)===String(value)?'selected':''}>${esc(v)}</option>`).join('')}
function taskToolbar(){return `<div class="toolbar"><input id="search" aria-label="Search" placeholder="${tr('Search tasks…','Tìm công việc…')}" value="${esc(search)}"><select id="status" aria-label="Status">${options([['all',tr('All statuses','Mọi trạng thái')],...['pending','progress','completed'].map(s=>[s,statusName(s)])],status)}</select><select id="priority" aria-label="Priority">${options([['all',tr('All priorities','Mọi ưu tiên')],...['low','medium','high'].map(s=>[s,priorityName(s)])],priority)}</select><select id="category" aria-label="Category">${options([['all',tr('All lists','Mọi danh mục')],...categories.map(c=>[c.id,catName(c)])],category)}</select><button type="button" id="clear-task-filters">${tr('Reset','Xóa lọc')}</button></div>`}

function taskSection() {
  return '<h2>' + tr('Task board', 'Danh s\u00e1ch c\u00f4ng vi\u1ec7c') + '</h2>' + taskToolbar() +
    '<div id="rows">' + rows() + '</div>';
}

function normalizeSearch(value) {
  return value.toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/\u0111/g, 'd').trim();
}

function matchingTasks() {
  const query = normalizeSearch(search);
  return tasks.filter(task =>
    (category === 'all' || String(task.category_id) === category) &&
    (status === 'all' || task.status === status) &&
    (priority === 'all' || task.priority === priority) &&
    normalizeSearch(task.title + ' ' + (task.description || '')).includes(query)
  );
}

function rows(){let a=matchingTasks().filter(task => {
  if (page === 'overview') return true;
  if (page === 'upcoming') return task.due_date > today();
  return task.due_date === (chosen || today());
});a.sort((left, right) => Number(left.status === 'completed') - Number(right.status === 'completed'));return a.map(t=>`<article class="task ${t.status==='completed'?'completed':''} ${selected===t.id?'selected':''}"><button class="check" data-toggle="${t.id}" aria-pressed="${t.status==='completed'}" aria-label="${tr('Completion','Hoàn thành')}: ${esc(t.title)}"><span aria-hidden="true"></span></button><button class="info" data-edit="${t.id}"><strong>${esc(t.title)}</strong><span class="meta">${esc(t.due_date)} · ${esc(t.due_time?.slice(0,5)||'—')} · ${esc(catName(categories.find(c=>c.id===t.category_id)))} · ${priorityName(t.priority)} · ${statusName(t.status)}</span></button><button class="arrow" data-edit="${t.id}" aria-label="Edit">›</button></article>`).join('')||`<div class="empty">${tr('No matching tasks.','Không có công việc phù hợp.')}</div>`}
function statistics(){let n=tasks.filter(t=>t.status==='completed').length, p=tasks.length?Math.round(n/tasks.length*100):0, counts=Array.from({length:7},(_,i)=>tasks.filter(t=>t.completed_at?.slice(0,10)===offset(i-6)).length),max=Math.max(1,...counts);return `<div class="stats">${[[n,tr('Completed','Hoàn thành')],[tasks.length-n,tr('Open','Chưa xong')],[tasks.filter(t=>t.due_date<today()&&t.status!=='completed').length,tr('Overdue','Quá hạn')]].map(([v,l])=>`<div class="card green"><div class="big">${v}</div>${l}</div>`).join('')}</div><div class="bento"><div class="card dark"><h2>${tr('Last 7 days','7 ngày gần nhất')}</h2><div class="bars">${counts.map((v,i)=>`<div class="bar">${v}<i style="height:${v/max*130}px"></i>${offset(i-6).slice(5)}</div>`).join('')}</div></div><div class="card"><h2>${tr('Completion rate','Tỷ lệ hoàn thành')}</h2><div class="big">${p}%</div><div class="track" style="background:#e3edda"><i style="width:${p}%"></i></div></div></div><div class="card"><h2>${tr('By category','Theo danh mục')}</h2>${categories.map(c=>{let v=tasks.filter(t=>t.category_id===c.id).length;return `<p>${esc(catName(c))} · ${v}</p><div class="track" style="background:#e3edda"><i style="width:${tasks.length?v/tasks.length*100:0}%;background:${categoryColor(c)}"></i></div>`}).join('')}</div>`}
function overview() {
  return '<section class="overview-stats" aria-labelledby="statistics-heading"><h2 id="statistics-heading">' +
    tr('Statistics', 'Th\u1ed1ng k\u00ea') + '</h2>' + statistics() + '</section>' + goals() + taskSection();
}

const categoryColor = category => /^#[0-9a-f]{6}$/i.test(category?.color) ? category.color : '#adcb60';
const calendarViews = () => [
  ['day', tr('Day', 'Ng\u00e0y')],
  ['week', tr('Week', 'Tu\u1ea7n')],
  ['month', tr('Month', 'Th\u00e1ng')],
];
const weekStart = date => new Date(date.getFullYear(), date.getMonth(),
  date.getDate() - (date.getDay() + 6) % 7);

function moveCalendar(step) {
  const date = new Date((chosen || today()) + 'T00:00:00');
  if (calendarView === 'month') {
    const originalDay = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + step);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    date.setDate(Math.min(originalDay, lastDay));
  } else {
    date.setDate(date.getDate() + step * (calendarView === 'week' ? 7 : 1));
  }
  chosen = dateKey(date);
  render();
}

function calendar() {
  const current = today();
  const selectedDay = chosen || current;
  const anchor = new Date(selectedDay + 'T00:00:00');
  const year = anchor.getFullYear();
  const monthIndex = anchor.getMonth();
  const locale = lang === 'vi' ? 'vi-VN' : 'en-US';
  const dateLabel = date => date.toLocaleDateString(locale, {dateStyle: 'medium'});
  const isMonth = calendarView === 'month';
  const isWeek = calendarView === 'week';
  const first = weekStart(isMonth ? new Date(year, monthIndex, 1) : anchor);
  const last = new Date(first.getFullYear(), first.getMonth(), first.getDate() + 6);
  const title = isMonth ? anchor.toLocaleDateString(locale, {month: 'long', year: 'numeric'})
    : isWeek ? dateLabel(first) + ' \u2013 ' + dateLabel(last)
    : anchor.toLocaleDateString(locale, {dateStyle: 'full'});
  const controls = calendarViews().map(([key, label]) =>
    '<button type="button" data-calendar-view="' + key + '" aria-pressed="' + (key === calendarView) + '">' + label + '</button>').join('');
  const heading = '<div class="calendarhead"><h2>' + esc(title) + '</h2>' +
    '<div class="calendar-controls"><div class="calendar-views" role="group" aria-label="' +
    tr('Calendar view', 'Ch\u1ebf \u0111\u1ed9 l\u1ecbch') + '">' + controls + '</div>' +
    '<div class="calendar-navigation"><button data-calendar-today="1">' + names().today + '</button>' +
    '<button data-calendar-step="-1" aria-label="' + tr('Previous period', 'Kho\u1ea3ng tr\u01b0\u1edbc') + '">&#8249;</button>' +
    '<button data-calendar-step="1" aria-label="' + tr('Next period', 'Kho\u1ea3ng sau') + '">&#8250;</button></div></div></div>';
  if (calendarView === 'day') return '<div class="card calendar-card">' + heading + '</div>' + taskSection();

  const days = new Date(year, monthIndex + 1, 0).getDate();
  const leadingDays = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
  const count = isMonth ? Math.ceil((leadingDays + days) / 7) * 7 : 7;
  const weekdays = Array.from({length: 7}, (_, i) =>
    new Date(first.getFullYear(), first.getMonth(), first.getDate() + i).toLocaleDateString(locale, {weekday: 'short'}));
  const tasksByDay = new Map();
  for (const task of matchingTasks()) {
    if (!tasksByDay.has(task.due_date)) tasksByDay.set(task.due_date, []);
    tasksByDay.get(task.due_date).push(task);
  }

  const cells = Array.from({length: count}, (_, i) => {
    const date = new Date(first.getFullYear(), first.getMonth(), first.getDate() + i);
    const key = dateKey(date);
    const dayTasks = tasksByDay.get(key) || [];
    const classes = ['calendar-cell', isMonth && date.getMonth() !== monthIndex && 'outside-month',
      key === current && 'selected-day'].filter(Boolean).join(' ');
    const label = date.toLocaleDateString(locale, {dateStyle: 'full'});
    return '<div class="' + classes + '"><button class="calendar-day" data-date="' + key +
      '" aria-label="' + esc(label) + '"' + (key === current ? ' aria-current="date"' : '') + '>' +
      date.getDate() + '</button><div class="calendar-tasks">' +
      dayTasks.map(task => calendarTask(task, isMonth)).join('') + '</div></div>';
  }).join('');
  return '<div class="card calendar-card">' + heading + taskToolbar() +
    '<div class="calendar-scroll" tabindex="0" role="region" aria-label="' + esc(title) + '">' +
    '<div class="month-grid ' + (isMonth ? 'calendar-month' : 'calendar-week') + '">' +
    weekdays.map(day => '<div class="calendar-weekday">' + esc(day) + '</div>').join('') +
    cells + '</div></div></div>';
}

function calendarTask(task, compact) {
  const time = task.due_time?.slice(0, 5);
  const color = categoryColor(categories.find(item => item.id === task.category_id));
  const classes = 'calendar-task' + (compact ? ' calendar-dot' : '') +
    (task.status === 'completed' ? ' is-completed' : '');
  return '<button class="' + classes + '" data-edit="' + task.id + '" data-preview="' + task.id +
    '" style="--task-color:' + color + '" aria-label="' + esc((time ? time + ' ' : '') + task.title) + '">' +
    (compact ? '' : (time ? '<time>' + esc(time) + '</time>' : '') + '<span>' + esc(task.title) + '</span>') +
    '</button>';
}

function hideTaskPreview() {
  const preview = $('task-preview');
  if (preview.hidden) return;
  preview.anchor?.removeAttribute('aria-describedby');
  preview.anchor = null;
  preview.hidden = true;
}

function showTaskPreview(anchor) {
  const task = tasks.find(item => item.id === Number(anchor.dataset.preview));
  if (!task) return;
  hideTaskPreview();
  const preview = $('task-preview');
  const locale = lang === 'vi' ? 'vi-VN' : 'en-US';
  const date = new Date(task.due_date + 'T00:00:00').toLocaleDateString(locale, {dateStyle: 'medium'});
  const deadline = date + (task.due_time ? ' \u00b7 ' + task.due_time.slice(0, 5) : '');
  const description = task.description?.trim();
  const summary = description?.length > 160 ? description.slice(0, 157).trimEnd() + '\u2026' : description;
  preview.innerHTML = '<small>' + tr('Due', 'H\u1ea1n') + ' \u00b7 ' + esc(deadline) + '</small>' +
    '<strong>' + esc(task.title) + '</strong>' + (summary ? '<p>' + esc(summary) + '</p>' : '');
  preview.hidden = false;
  preview.anchor = anchor;
  anchor.setAttribute('aria-describedby', preview.id);
  const rect = anchor.getBoundingClientRect();
  const left = Math.max(8, Math.min(rect.left, window.innerWidth - preview.offsetWidth - 8));
  const top = rect.bottom + 8 + preview.offsetHeight <= window.innerHeight
    ? rect.bottom + 8 : Math.max(8, rect.top - preview.offsetHeight - 8);
  preview.style.left = left + 'px';
  preview.style.top = top + 'px';
}

for (const event of ['pointerover', 'focusin']) {
  document.addEventListener(event, e => {
    const anchor = e.target.closest('[data-preview]');
    if (anchor && e.pointerType !== 'touch' && !anchor.contains(e.relatedTarget)) showTaskPreview(anchor);
  });
}
for (const event of ['pointerout', 'focusout']) {
  document.addEventListener(event, e => {
    const anchor = e.target.closest('[data-preview]');
    if (anchor && !anchor.contains(e.relatedTarget) &&
        !(event === 'pointerout' && anchor === document.activeElement)) hideTaskPreview();
  });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') hideTaskPreview(); });
window.addEventListener('scroll', hideTaskPreview, true);
window.addEventListener('resize', hideTaskPreview);
function openEditor(id){selected=id;let t=tasks.find(t=>t.id===id)||{title:'',description:'',due_date:chosen||today(),due_time:'',category_id:categories[0]?.id,priority:'medium',status:'pending'};if(!categories.length)return error(Error(tr('No categories available','Chưa có danh mục')));$('editorTitle').textContent=id?tr('Task details','Chi tiết công việc'):tr('New task','Công việc mới');$('fields').innerHTML=`<label>${tr('Task name','Tên công việc')}<input name="title" required maxlength="200" value="${esc(t.title)}"></label><label>${tr('Description','Mô tả')}<textarea name="description">${esc(t.description)}</textarea></label><label>${tr('Category','Danh mục')}<select name="category_id">${options(categories.map(c=>[c.id,catName(c)]),t.category_id)}</select></label><label>${tr('Due date','Ngày thực hiện')}<input type="date" name="due_date" required value="${esc(t.due_date)}"></label><label>${tr('Time','Giờ')}<input type="time" name="due_time" value="${esc(t.due_time?.slice(0,5))}"></label><label>${tr('Priority','Ưu tiên')}<select name="priority">${options(['low','medium','high'].map(s=>[s,priorityName(s)]),t.priority)}</select></label><label>${tr('Status','Trạng thái')}<select name="status">${options(['pending','progress','completed'].map(s=>[s,statusName(s)]),t.status)}</select></label>`;$('remove').hidden=!id;$('remove').textContent=tr('Delete','Xóa');$('save').textContent=tr('Save changes','Lưu thay đổi');render();$('editor').showModal()}
$('editor').addEventListener('close',()=>{selected=null;render()});$('close').onclick=()=>$('editor').close();$('add').onclick=()=>openEditor(null);$('language').onclick=()=>{lang=lang==='en'?'vi':'en';localStorage.setItem('todu-lang',lang);render()};$('taskform').onsubmit=async e=>{e.preventDefault();try{await api('tasks'+(selected?'/'+selected:''),selected?'PUT':'POST',Object.fromEntries(new FormData(e.target)));$('editor').close();await load()}catch(e){alert(e.message)}};$('remove').onclick=async()=>{if(!confirm(tr('Delete this task?','Xóa công việc này?')))return;try{await api('tasks/'+selected,'DELETE');$('editor').close();await load()}catch(e){alert(e.message)}};
const categoryForm = $('category-form');
const categoryDialog = $('category-editor');
const categorySave = $('save-category');
const categoryError = $('category-error');
$('add-category').onclick = () => {
  categoryForm.reset();
  categoryError.hidden = true;
  $('category-title').textContent = tr('New category', 'Danh m\u1ee5c m\u1edbi');
  $('category-name-label').textContent = tr('Name', 'T\u00ean');
  $('category-color-label').textContent = tr('Color', 'M\u00e0u');
  categorySave.textContent = tr('Save category', 'L\u01b0u danh m\u1ee5c');
  categoryDialog.showModal();
};
$('close-category').onclick = () => categoryDialog.close();
categoryForm.onsubmit = async event => {
  event.preventDefault();
  if (categorySave.disabled) return;
  categorySave.disabled = true;
  categoryError.hidden = true;
  try {
    const category = await api('categories', 'POST', Object.fromEntries(new FormData(categoryForm)));
    categories = [...categories.filter(item => item.id !== category.id), category];
    if (categoryDialog.open) categoryDialog.close();
    render();
  } catch (err) {
    categoryError.textContent = err.status === 409
      ? tr('This category name already exists.', 'T\u00ean danh m\u1ee5c n\u00e0y \u0111\u00e3 t\u1ed3n t\u1ea1i.')
      : err.status === 400
        ? tr('Enter a valid category name and color.', 'H\u00e3y nh\u1eadp t\u00ean v\u00e0 m\u00e0u h\u1ee3p l\u1ec7.')
        : tr('Could not save the category. Try again.', 'Ch\u01b0a l\u01b0u \u0111\u01b0\u1ee3c danh m\u1ee5c. H\u00e3y th\u1eed l\u1ea1i.');
    categoryError.hidden = false;
  } finally {
    categorySave.disabled = false;
  }
};

document.addEventListener('click',async e=>{let b=e.target.closest('button');if(!b)return;let d=b.dataset;if(d.page)navigate(d.page);if(d.cat){page='today';chosen=null;resetTaskFilters();category=d.cat;render()}if(d.edit)openEditor(Number(d.edit));if(d.toggle){let t=tasks.find(t=>t.id===Number(d.toggle));try{await api('tasks/'+t.id,'PUT',{...t,status:t.status==='completed'?'pending':'completed'});await load()}catch(e){error(e)}}if(d.calendarToday){chosen=today();render()}if(d.calendarStep)moveCalendar(Number(d.calendarStep));if(d.calendarView){calendarView=d.calendarView;render()}if(d.date){chosen=d.date;calendarView='day';render()}});
function resetTaskFilters() {
  search = '';
  status = priority = category = 'all';
}

function refreshTaskResults() {
  const list = $('rows');
  if (list) {
    list.innerHTML = rows();
    return;
  }

  const grid = document.querySelector('.calendar-scroll');
  if (!grid) return;
  hideTaskPreview();
  const next = document.createElement('div');
  next.innerHTML = calendar();
  grid.innerHTML = next.querySelector('.calendar-scroll').innerHTML;
}

document.addEventListener('input', event => {
  if (event.target.id !== 'search') return;
  search = event.target.value;
  refreshTaskResults();
});
document.addEventListener('change', event => {
  const {id, value} = event.target;
  if (id === 'status') status = value;
  else if (id === 'priority') priority = value;
  else if (id === 'category') category = value;
  else return;
  refreshTaskResults();
});
$('content').addEventListener('click', event => {
  if (event.target.id !== 'clear-task-filters') return;
  resetTaskFilters();
  $('search').value = '';
  $('status').value = $('priority').value = $('category').value = 'all';
  refreshTaskResults();
});
render();
load();
