# ART WORLD – Bài thực hành 1 (Bootstrap 3, phong cách Pop Mart)

Mở `ecommerce.html` bằng trình duyệt (cần Internet để tải Bootstrap, jQuery, font Barlow).
Các thư viện xZoom và bootstrap-star-rating đã nằm sẵn trong `libs/`.

## Cấu trúc
```
artworld/
├── ecommerce.html          Trang chủ: header, slider 3 banner, danh mục (lọc được), lưới 8 sản phẩm
├── ecommerce-detail.html   Chi tiết sản phẩm (xZoom, form, review, comment, sản phẩm khác)
├── ecommerce-status.html   Trạng thái đơn hàng
├── css/style.css           Toàn bộ giao diện (đổi màu nhấn ở biến --accent đầu file)
├── js/main.js              xZoom, star-rating, đếm ngược, lọc danh mục, modal review
├── libs/                   xzoom, star-rating
└── images/
    ├── banner1..3.jpg      3 banner (đã có)
    ├── placeholder.svg     Ảnh tạm khi chưa có ảnh thật
    ├── logo.png            ← BẠN BỔ SUNG (chưa có thì hiện chữ "ART WORLD")
    └── products/           ← BẠN BỔ SUNG ảnh sản phẩm
```

## Cách bổ sung ảnh (không cần sửa HTML)
Đặt file vào `images/products/` đúng tên, trang sẽ tự dùng ảnh thật thay cho placeholder:
- `sp1-1.jpg`, `sp1-2.jpg`, `sp1-3.jpg`, `sp1-4.jpg` … đến `sp8-1.jpg …` (số đầu là sản phẩm, số sau là ảnh thứ mấy).
- Ảnh `spN-1.jpg` là ảnh hiển thị ở trang chủ và ảnh lớn ở trang chi tiết.
- Trang chi tiết hiện đang là sản phẩm 1, nên cần đủ 4 ảnh `sp1-1 … sp1-4` để xZoom có ảnh nhỏ để chọn.
- Nên dùng ảnh cùng tỉ lệ (khoảng 5:6, nền trắng hoặc trong suốt) để khung zoom khớp đúng.

## Những chỗ cần bạn điền (tìm trong HTML các dấu `[...]` và `XX`, `000.000đ`)
| Nội dung | File |
|---|---|
| Tên, giá, giá gốc, % giảm, nhãn New/Best Seller, số review, thanh kho, số sao của 8 sản phẩm | `ecommerce.html` (mỗi sản phẩm có 1 khối chú thích `SẢN PHẨM N`) |
| Mô tả ngắn, mô tả chi tiết, phiên bản, giá, review, 3 bình luận | `ecommerce-detail.html` |
| 6 đơn hàng (tên, số lượng, giá, trạng thái) | `ecommerce-status.html` |

Các số như "Đã bán XX", `-XX%`, 30% của thanh kho, đồng hồ đếm ngược, số sao chỉ là **dữ liệu mẫu** để thấy giao diện, hãy thay bằng dữ liệu thật.
- Thanh kho: từ 80% trở lên dùng class `stock-hot` và chữ "Sắp bán hết" (đã có mẫu ở sản phẩm 2 và 5).
- Danh mục của từng sản phẩm đặt ở thuộc tính `data-cat` (`the-monsters`, `skull-panda`, `hirono`, `molly`, `crybaby`).
- Đồng hồ đếm ngược chỉnh bằng `data-seconds` (số giây).

## Yêu cầu của đề đã có
| Yêu cầu | Vị trí |
|---|---|
| xZoom: hiển thị, chọn, zoom hình | `ecommerce-detail.html` + `initZoom()` |
| Bootstrap progress làm trạng thái kho (kèm đồng hồ) | `.stock-wrap` trong các thẻ sản phẩm |
| Giảm giá góc trái, New / Best Seller góc phải | `.badge-discount`, `.badge-tag` |
| bootstrap-star-rating thay `glyphicon-star` | class `rating-display` + `initRatings()` |
