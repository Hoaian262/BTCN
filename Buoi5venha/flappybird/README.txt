FLAPPY BIRD V2
Mở index.html bằng trình duyệt hoặc Live Server. Click bắt đầu, nhấn từng lần phím mũi tên xuống để bay. Chơi lại từ 0 điểm.
Giữ nguyên bg.png, khung 350x480, jQuery và bố cục gốc. Thay bird.png và thêm pole.png.
script.js: gravity tăng vận tốc rơi; keydown đặt vận tốc âm; requestAnimationFrame cập nhật hình ảnh; setInterval dịch mục tiêu của pole theo 40/30/25/20 ms; Math.sin tạo dao động; collision kiểm tra hình chữ nhật; levelUp đổi interval và hiện thông báo không dừng game. Web Audio tạo tiếng bay và lên cấp.
Thông số độ khó nằm trong gaps, amplitudes, periods. Kiểm thử cú pháp bằng Node; cần chơi thử thực tế để đánh giá độ khó.

V3: Parallax và hiệu ứng thua
- CSS: 4 lớp chuyển động, cùng chiều rộng lặp 852px, tốc độ 8/15/25/60 px/s.
- JS: thêm/xóa class running để chạy/dừng nền; khi thua khóa điều khiển, dừng vòng lặp, chạy falling và rising, sau 1.5s hiện GAME OVER.
- Không đổi gravity, flap, interval, gap, biên độ, chu kỳ, điểm số hoặc kích thước khung V2.
- Game phát sounds/level-up.wav khi lên cấp. Nếu tệp không phát được, game dùng âm thanh dự phòng.
- Retry tải lại trang như V2.
