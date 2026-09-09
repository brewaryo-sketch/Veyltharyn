Veyltharyn — SQLite All-in-One
=================================

Tujuan:
- Tidak membutuhkan MariaDB.
- Data persisten disimpan di database/veyltharyn.sqlite.
- Login, user, produk, order, voucher, VNCoins, gacha, notifikasi, dan chat
  menggunakan database SQLite.

Termux:
1. Ekstrak ZIP ini menjadi folder Veyltharyn.
2. Masuk folder:
   cd ~/storage/downloads/Veyltharyn
3. Jalankan sekali:
   bash setup_sqlite.sh
4. Buat owner:
   php tools/create_owner.php
   Password dimasukkan langsung di Termux; jangan kirim password ke chat.
5. Jalankan:
   php -S 0.0.0.0:8080
6. Buka:
   http://127.0.0.1:8080/login.html

Catatan:
- File database/veyltharyn.sqlite jangan dihapus jika ingin data tetap ada.
- GitHub Pages saja tidak dapat menjalankan PHP/SQLite. Untuk akses publik,
  project harus dijalankan pada server yang mendukung PHP.
- Jangan menggunakan root MariaDB lagi; versi ini tidak memerlukannya.
