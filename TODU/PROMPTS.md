# Vibe Coding — TODU

## Yêu cầu người dùng đã chốt
TODO website quản lý task cá nhân: hiển thị task hôm nay, search/filter, thêm sửa xóa, thống kê; responsive; Node.js + Express + MySQL; bilingual; không đăng nhập; Advanced; Poppins; kết hợp hai ảnh tham khảo theo Desktop Design V2.

## Prompt triển khai đề xuất (tái cấu trúc yêu cầu, không phải nhật ký nguyên văn)
1. GUI: Thiết kế workspace TODU theo Flat Design và Bento Grid, xanh #ADCB60, nền #EFFBE3, đen #191D1D, Poppins. Desktop có sidebar, task board, task details; mobile bottom navigation.
2. Database: Tạo MySQL schema categories/tasks, khóa chính/ngoại, enum trạng thái/ưu tiên, seed theo ngày hiện tại.
3. Backend: Express REST API GET/POST/PUT/DELETE, mysql2 parameterized queries, kiểm tra input, lỗi JSON, biến môi trường.
4. Integration: fetch API, search/filter kết hợp, CRUD, lịch tháng, thống kê từ dữ liệu thật, streak và tiến độ, EN/VI.
5. QA: Kiểm tra cú pháp JS, kiểm thử CRUD và persistence trên MySQL, responsive, lỗi kết nối. Ghi rõ các kiểm thử chưa thực hiện.
