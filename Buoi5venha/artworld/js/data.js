// Ảnh đầu tiên dùng cho thẻ sản phẩm và ảnh chính ở trang chi tiết.
// Dùng đường dẫn trong dự án hoặc URL trực tiếp đến ảnh.
// Phần trăm giảm giá được tính từ price và oldPrice.
// Số lượt bán và đánh giá bên dưới là dữ liệu mẫu.
window.ARTWORLD_PRODUCTS = [
  {
    "id": "sp1",
    "blindBoxSetSize": 12,
    "stockProgress": 30,
    "sold": 128,
    "reviews": [
      {"name":"Minh Anh","rating":5,"text":"Các tạo dáng chủ đề ban đêm rất dễ trưng bày cùng nhau."},
      {"name":"Gia Hân","rating":4,"text":"Mẫu cầm điện thoại là mẫu mình thích nhất trong bộ."},
      {"name":"Tuấn Kiệt","rating":5,"text":"Chi tiết nhỏ trên các mô hình làm chủ đề 1 giờ sáng rất thú vị."}
    ],
    "category": "the-monsters",
    "series": "The Monsters",
    "name": "THE MONSTERS 1:00 A.M. Series Figures",
    "price": "320.000đ",
    // TODO: xác nhận giá gốc thực tế của sp1.
    "oldPrice": "",
    "badge": "New",
    "shortDescription": "Bộ sưu tập blind box của POP MART tái hiện những khoảnh khắc về đêm của THE MONSTERS.",
    "description": "THE MONSTERS 1:00 A.M. Series Figures có các thiết kế như Sweet Dream Time, Phone Time và Relaxed Time, cùng mẫu bí mật Stop the Time. Hộp lẻ chứa một mẫu ngẫu nhiên. Bộ trọn gồm 12 hộp, trong đó mẫu bí mật có thể thay thế một mẫu thường. Mỗi mô hình cao khoảng 5,4–10,6 cm tùy mẫu. Chất liệu gồm PVC, ABS và linh kiện điện tử. Sản phẩm dành cho người từ 15 tuổi trở lên.",
    "images": [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251111_150627_775349____1_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251111_150627_268236____2_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251111_150627_681971____3_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251111_150628_899848____4_____1200x1200.jpg"
    ]
  },
  {
    "id": "sp2",
    "stockProgress": 85,
    "sold": 96,
    "reviews": [
      {"name":"Khánh Linh","rating":5,"text":"Tạo hình gấu trúc hợp với túi đeo màu đen của mình."},
      {"name":"Bảo Ngọc","rating":4,"text":"Kích thước vừa để treo túi, khuôn mặt có nét rất riêng."},
      {"name":"Phương Vy","rating":5,"text":"Mình thích cách phối hai màu đen và trắng của mẫu này."}
    ],
    "category": "skull-panda",
    "series": "Skull Panda",
    "name": "Búp bê Skull Panda Lazy Panda Plush",
    "price": "769.000đ",
    "oldPrice": "900.000đ",
    "badge": "Best Seller",
    "shortDescription": "Búp bê SKULLPANDA phiên bản Lazy Panda với tạo hình gấu trúc, có thể dùng làm phụ kiện treo túi.",
    "description": "Thương hiệu: POP MART\nKích thước sản phẩm: cao khoảng 13.5 cm\nChất liệu:  PVC/ABS/polyester fiber\nXuất xứ: Trung Quốc\nNhà nhập khẩu:\nCông ty TNHH Pop Mart Việt Nam\nLầu 4, Tòa nhà Friendship, số 31 Đường Lê Duẩn, phường Sài Gòn, Thành phố Hồ Chí Minh, Việt Nam",
    "images": [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20250819_163356_571586____1_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20250819_163356_031603____2_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20250819_163356_943048____3_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20250819_163356_180238____4_____1200x1200.jpg"
    ]
  },
  {
    "id": "sp3",
    "blindBoxSetSize": 12,
    "stockProgress": 45,
    "sold": 164,
    "reviews": [
      {"name":"Hoàng Nam","rating":5,"text":"Những tạo hình như đồng hồ và lồng chim khiến mình muốn xem đủ cả bộ."},
      {"name":"Mai Chi","rating":4,"text":"Mô hình nhỏ, dễ đặt chung với các bộ Hirono khác."},
      {"name":"Đức Minh","rating":5,"text":"Chủ đề nơi trú ẩn được thể hiện rất khác nhau ở từng mẫu."}
    ],
    "category": "hirono",
    "series": "Hirono",
    "name": "Hirono Shelter Series Figures",
    "price": "280.000đ",
    "oldPrice": "400.000đ",
    "badge": "",
    "shortDescription": "Bộ sưu tập blind box của POP MART với các tạo hình Hirono lấy cảm hứng từ những nơi trú ẩn.",
    "description": "Thương hiệu: POP MART\nKích thước: Cao khoảng 6-10cm\nChất liệu: PVC/ABS/Nam châm\nQuy cách: Nguyên bộ gồm 12 hộp mù\nXuất xứ: Trung Quốc\nNhà nhập khẩu:\nCông ty TNHH Pop Mart Việt Nam\nLầu 4, Tòa nhà Friendship, số 31 Đường Lê Duẩn, phường Sài Gòn, Thành phố Hồ Chí Minh, Việt Nam",
    "images": [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20240715_143422_831856____1_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20240715_143423_989751____2_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20240715_143423_039737____3_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20240715_143423_457782____4_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20240715_143423_769612____5_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20240715_143423_273003____7_____1200x1200.jpg",
    ]
  },
  {
    "id": "sp4",
    "blindBoxSetSize": 12,
    "stockProgress": 20,
    "sold": 87,
    "reviews": [
      {"name":"Lan Anh","rating":5,"text":"Nhìn trang phục là nhận ra ngay chủ đề Zootopia."},
      {"name":"Hải Yến","rating":4,"text":"Mình thích bộ này vì vẫn nhận ra nét mặt đặc trưng của MOLLY."},
      {"name":"Thảo Nguyên","rating":5,"text":"Các mẫu phối màu vui mắt khi đặt cạnh nhau."}
    ],
    "category": "molly",
    "series": "Molly",
    "name": "MOLLY x Zootopia Co-branded Series Figures",
    "price": "290.000đ",
    "oldPrice": "300.000đ",
    "badge": "New",
    "shortDescription": "Bộ sưu tập blind box kết hợp tạo hình MOLLY với thế giới động vật của Disney Zootopia.",
    "description": "Thương hiệu: POP MART\nKÍCH THƯỚC: Cao khoảng 6–11 cm\nCHẤT LIỆU: PVC/ABS/Nylon\nMột bộ đầy đủ gồm 12 hộp mù\nXuất xứ: Trung Quốc\nNhà nhập khẩu:\nCông ty TNHH Pop Mart Việt Nam\nLầu 4, Tòa nhà Friendship, số 31 Đường Lê Duẩn, phường Sài Gòn, Thành phố Hồ Chí Minh, Việt Nam",
    "images": [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251014_095128_956249____1_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251014_095129_083861____3_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251014_095129_225061____5_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251014_095129_750558____6_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251014_095130_511411____7_____1200x1200.jpg"
    ]
  },
  {
    "id": "sp5",
    "blindBoxSetSize": 12,
    "stockProgress": 90,
    "sold": 213,
    "reviews": [
      {"name":"Ngọc Hà","rating":5,"text":"Bubbles là mẫu mình thích nhất, nhìn rất hợp với phong cách CRYBABY."},
      {"name":"Yến Nhi","rating":4,"text":"Các tạo hình gợi nhớ bộ phim hoạt hình mình xem hồi nhỏ."},
      {"name":"Anh Thư","rating":5,"text":"Biểu cảm của Blossom và Buttercup nhìn rất khác nhau khi đặt cạnh nhau."}
    ],
    "category": "crybaby",
    "series": "CryBaby",
    "name": "CRYBABY x Powerpuff Girls Series Figures",
    "price": "280.000đ",
    "oldPrice": "400.000đ",
    "badge": "",
    "shortDescription": "Bộ sưu tập blind box tái hiện Blossom, Bubbles và Buttercup theo phong cách CRYBABY.",
    "description": "Thương hiệu: POP MART\nKích thước: Cao khoảng 6-9cm\nChất liệu: PVC/ABS\nQuy cách: Nguyên bộ (Full set) gồm 12 hộp mù\nXuất xứ: Trung Quốc\nNhà nhập khẩu:\nCông ty TNHH Pop Mart Việt Nam\nLầu 4, Tòa nhà Friendship, số 31 Đường Lê Duẩn, phường Sài Gòn, Thành phố Hồ Chí Minh, Việt Nam",
    "images": [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20240304_164111_296715__1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20240307_135855_545730__1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20240307_135900_754875__1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20240307_135904_928134__1200x1200.jpg"
    ]
  },
  {
    "id": "sp6",
    "stockProgress": 60,
    "sold": 24,
    "reviews": [
      {"name":"Quang Huy","rating":5,"text":"Tạo hình Giáng Sinh hợp để trưng bày theo mùa."},
      {"name":"Hà My","rating":4,"text":"Mô hình nổi bật trên kệ, mình chừa riêng một khoảng để đặt."},
      {"name":"Bình An","rating":5,"text":"Màu sắc của phiên bản Winter Holiday nhìn rất vui mắt."}
    ],
    "category": "the-monsters",
    "series": "The Monsters",
    "name": "MEGA LABUBU TEC 100% Winter Holiday",
    "price": "18.690.000đ",
    "oldPrice": "",
    "badge": "",
    "shortDescription": "Mô hình sưu tầm MEGA LABUBU TEC 100% phiên bản Winter Holiday, lấy cảm hứng từ mùa Giáng Sinh.",
    "description": "THƯƠNG HIỆU: POP MART\nBỘ SƯU TẬP: MEGA LABUBU TEC 100% Winter Holiday\nKÍCH THƯỚC: 30cm\nCHẤT LIỆU: PVC, ABS, linh kiện điện tử\nĐỘ TUỔI: 15+\nMÔ TẢ: Mẫu thiết kế đặc biệt của Labubu với chủ đề Giáng Sinh. Mỗi mô hình cao khoảng 30 cm. Chất liệu gồm PVC, ABS và linh kiện điện tử. Sản phẩm dành cho người từ 15 tuổi trở lên.",
    "images": [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251113_165538_089055____2_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251113_165538_937672____4_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251113_165538_029777____5_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251113_165538_422391____6_____1200x1200.jpg"
    ]
  },
  {
    "id": "sp7",
    "stockProgress": 100,
    "sold": 42,
    "reviews": [
      {"name":"Nhật Minh","rating":5,"text":"Chủ đề tìm người ngoài hành tinh rất hợp với vẻ tò mò của Hirono."},
      {"name":"Trâm Anh","rating":4,"text":"Mẫu này đủ lớn để làm điểm nhấn trên kệ."},
      {"name":"Đăng Khoa","rating":5,"text":"Mình thích ý tưởng khoa học viễn tưởng của mô hình này."}
    ],
    "category": "hirono",
    "series": "Hirono",
    "name": "Hirono Search for Aliens Figurine",
    "price": "2.690.000đ",
    "oldPrice": "3.000.000đ",
    "badge": "Best Seller",
    "shortDescription": "Mô hình Hirono cao khoảng 18 cm với chủ đề tìm kiếm người ngoài hành tinh.",
    "description": "Thương hiệu: POP MART\nChiều cao: khoảng 18 cm\nChất liệu: PVC, ABS, phụ kiện kim loại, nam châm và linh kiện điện tử\nĐộ tuổi: từ 15 tuổi trở lên",
    "images": [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20250826_135041_137650____1_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20250826_135041_593383____2_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20250826_135041_600343____4_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20250826_135041_353774____5_____1200x1200.jpg"
    ]
  },
  {
    "id": "sp8",
    "stockProgress": 100,
    "sold": 151,
    "reviews": [
      {"name":"Thu Trang","rating":5,"text":"Móc vào quai ba lô nhìn rất dễ thương."},
      {"name":"Hồng Nhung","rating":4,"text":"Tạo hình CRYBABY nổi bật khi gắn lên chiếc túi trơn của mình."},
      {"name":"Thanh Vy","rating":5,"text":"Mình dùng móc này để dễ nhận ra chùm chìa khóa."}
    ],
    "category": "crybaby",
    "series": "CryBaby",
    "name": "Móc khóa hình nhân vật CRYBABY",
    "price": "262.000đ",
    "oldPrice": "300.000đ",
    "badge": "",
    "shortDescription": "Móc khóa CRYBABY dùng để trang trí túi xách, ba lô hoặc chùm chìa khóa.",
    "description": "Phụ kiện sưu tầm của POP MART với tạo hình nhân vật CRYBABY. Có thể gắn móc vào khóa kéo, quai túi hoặc vòng chìa khóa để mang theo hằng ngày.",
    "images": [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251028_144424_566349____1_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251028_144424_931500____2_____1200x1200.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-eurasian-res.popmart.com/default/20251028_144423_117717____3_____1200x1200.jpg"
    ]
  }
];
