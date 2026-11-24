Game phát level-up.wav khi lên cấp. Nếu tệp không phát được, game dùng âm thanh dự phòng.

Khi mở index.html trực tiếp, game đọc bản WAV đóng gói trong level-up-data.js.
Sau khi thay level-up.wav, chạy các lệnh PowerShell sau trong thư mục sounds để cập nhật bản này:

$wav = [Convert]::ToBase64String([IO.File]::ReadAllBytes((Resolve-Path 'level-up.wav').Path))
Set-Content -Encoding ASCII -Path 'level-up-data.js' -Value "window.levelUpWavBase64 = '$wav';"
