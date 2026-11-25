# TODU. — Personal task management

## Chạy trên Windows
1. Cài Node.js 22 LTS, MySQL Server và MySQL Workbench. Khởi động MySQL Server.
2. Mở Workbench, kết nối localhost, mở và chạy toàn bộ `database/schema.sql` (nút tia sét). Chạy `database/seed.sql` một lần nếu muốn dữ liệu mẫu.
3. Mở thư mục TODU trong VS Code. Terminal PowerShell: `Copy-Item .env.example .env` rồi sửa DB_PASSWORD trong .env thành mật khẩu MySQL của bạn. Không chia sẻ .env.
4. Chạy `npm install`, sau đó `npm start`. Mở http://localhost:3000 (không dùng Live Server).

## Kiến trúc
HTML/CSS/JS gọi REST API Express qua fetch; mysql2 dùng truy vấn tham số để đọc/ghi MySQL. Hai bảng categories (1) — (N) tasks. Một workspace cá nhân, không đăng nhập; server chỉ lắng nghe localhost. Ngôn ngữ lưu localStorage, task lưu MySQL. Thống kê tính từ task thực tế, seed là dữ liệu minh họa. Streak tính theo ngày hoàn thành liên tiếp, cho phép hôm nay chưa hoàn thành nếu chuỗi kéo dài đến hôm qua. Ngày theo máy người dùng và giờ MySQL; nên đặt cùng múi giờ.

## Kiểm thử thủ công
- Today: chỉ hiện task có ngày hôm nay; tìm kiếm và kết hợp 3 bộ lọc.
- Thêm task, tải lại trang, kiểm tra dữ liệu vẫn còn; sửa tên/ngày/ưu tiên; xóa có xác nhận.
- Đánh dấu hoàn thành, kiểm tra tiến độ và Statistics (Overview) thay đổi.
- Calendar: chuyển Ngày/Tuần/Tháng, xem nhanh task và mở chi tiết; danh sách task chỉ hiện ở chế độ Ngày. Upcoming: task tương lai.
- Danh mục: thêm tên và màu, kiểm tra bộ lọc và form task sau khi tải lại.
- EN/VI: đổi ngôn ngữ, tải lại; nội dung task do người dùng nhập không tự dịch.
- DevTools: kiểm tra 390px, 768px, 1440px; mở bảng chi tiết.
- Dừng MySQL: kiểm tra thông báo lỗi. Khởi động lại và tải lại trang.

## Minh chứng
Chụp Today desktop/mobile, Task details, tìm kiếm/lọc, Statistics (Overview) trước/sau hoàn thành, Workbench schema và SELECT * FROM tasks, terminal npm start, Network API, PROMPTS.md.

## Giới hạn
Chưa có xác thực, không triển khai công khai. Font Poppins tải qua Google Fonts (fallback Arial). Chưa chạy kiểm thử tích hợp MySQL trong môi trường tạo mã nguồn.
