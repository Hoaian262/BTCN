USE todu;
SET NAMES utf8mb4;

INSERT INTO tasks (title, description, category_id, due_date, due_time, priority, status, completed_at)
SELECT demo.title, demo.description, category.id,
       DATE_ADD(CURDATE(), INTERVAL demo.day_offset DAY), demo.due_time, demo.priority, demo.status,
       CASE WHEN demo.status = 'completed'
         THEN DATE_ADD(NOW(), INTERVAL demo.day_offset DAY)
       END
FROM (
  SELECT 'Study Node.js' AS title, 'Review HTTP and REST APIs' AS description,
         'Study' AS category_name, 0 AS day_offset, '08:00' AS due_time,
         'high' AS priority, 'completed' AS status
  UNION ALL SELECT 'Build TODU website', 'Finish responsive dashboard', 'Work', 0, '10:30', 'high', 'progress'
  UNION ALL SELECT 'Review assignment', 'Check submission requirements', 'Study', 0, '14:00', 'medium', 'pending'
  UNION ALL SELECT 'Read a book', 'Read 20 pages', 'Personal', 0, '18:00', 'low', 'completed'
  UNION ALL SELECT 'Plan tomorrow', 'Prepare tomorrow’s schedule', 'Personal', 0, '20:00', 'medium', 'pending'
  UNION ALL SELECT 'Prepare presentation', 'Draft slides', 'Study', 1, '09:00', 'high', 'pending'
  UNION ALL SELECT 'Organize notes', 'Weekly review', 'Study', -1, '09:00', 'medium', 'completed'
  UNION ALL SELECT 'Finish reading', 'Personal goal', 'Personal', -2, '09:00', 'low', 'completed'
  UNION ALL SELECT 'Ôn bài SQL', 'Luyện JOIN và GROUP BY với dữ liệu mẫu.', 'Study', 0, '08:45', 'high', 'progress'
  UNION ALL SELECT 'Gửi báo cáo tuần', 'Tổng hợp tiến độ và các việc cần theo dõi.', 'Work', 0, '11:30', 'high', 'pending'
  UNION ALL SELECT 'Đọc sách 20 phút', 'Ghi lại một ý từ chương đang đọc.', 'Personal', 0, '19:30', 'low', 'completed'
  UNION ALL SELECT 'Lên thực đơn tuần', 'Chọn ba món và lập danh sách mua sắm.', 'Personal', 0, NULL, 'medium', 'pending'
  UNION ALL SELECT 'Kiểm tra bản demo', 'Thử tạo task, lọc danh mục và chuyển lịch.', 'Work', 1, '10:00', 'medium', 'progress'
  UNION ALL SELECT 'Nộp bài thiết kế', 'Xuất PDF và kiểm tra yêu cầu nộp bài.', 'Study', 2, '15:00', 'high', 'pending'
  UNION ALL SELECT 'Đi bộ buổi sáng', 'Đi một vòng quanh công viên.', 'Personal', 3, '07:00', 'low', 'pending'
  UNION ALL SELECT 'Cập nhật tài liệu dự án', 'Bổ sung hướng dẫn cho người dùng mới.', 'Work', 5, '14:30', 'medium', 'pending'
  UNION ALL SELECT 'Chuẩn bị bài thuyết trình', 'Soạn dàn ý và luyện nói thử.', 'Study', 8, '09:30', 'medium', 'pending'
  UNION ALL SELECT 'Đặt lịch khám định kỳ', 'Kiểm tra lịch trống và đặt hẹn.', 'Personal', 12, NULL, 'medium', 'pending'
  UNION ALL SELECT 'Tổng kết sprint', 'Ghi nhận kết quả và các việc chuyển sang sprint sau.', 'Work', 15, '16:00', 'high', 'pending'
  UNION ALL SELECT 'Tóm tắt bài giảng', 'Ôn lại nội dung chính và ghi chú câu hỏi.', 'Study', -1, '17:00', 'medium', 'completed'
  UNION ALL SELECT 'Dọn thư mục dự án', 'Sắp xếp lại tài liệu theo chủ đề.', 'Work', -2, '10:00', 'low', 'completed'
  UNION ALL SELECT 'Sao lưu ảnh', 'Đồng bộ album tháng này.', 'Personal', -3, '20:00', 'low', 'completed'
  UNION ALL SELECT 'Đối chiếu yêu cầu bài tập', 'Rà lại các tiêu chí trước khi gửi bài.', 'Study', -4, '14:00', 'high', 'pending'
  UNION ALL SELECT 'Gửi biên bản họp', 'Chốt các đầu việc và người phụ trách.', 'Work', -6, '11:00', 'medium', 'completed'
) AS demo
JOIN categories AS category ON category.name = demo.category_name
WHERE NOT EXISTS (
  SELECT 1 FROM tasks AS existing
  WHERE existing.title = demo.title
    AND existing.description = demo.description
    AND existing.category_id = category.id
);
