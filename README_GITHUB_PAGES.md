# Veyltharyn — GitHub Pages Edition

Versi ini 100% statis dan tidak membutuhkan PHP/MariaDB. Data demo/pengguna disimpan di localStorage browser.

## Penting
GitHub Pages tidak menjalankan PHP/SQLite. Karena itu versi ini memakai penyimpanan browser. Data tidak otomatis terbagi antar-browser/pengguna. Untuk marketplace/chat/admin yang benar-benar shared dan 24/7, gunakan backend online seperti Supabase/Firebase.

## Publish
1. Upload isi folder ini ke repository GitHub.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Buka URL Pages.

## Alur
Register → Login → Dashboard. Setelah register, email otomatis dibawa ke halaman Login dan muncul pesan: “Akun berhasil dibuat. Masukan Email & Sandi yang telah Anda buat.”

## Chat Admin
Tombol PNG Chat Admin mengambang di kanan bawah dan membuka `chat.html`.


## Marketplace update
Member accounts can upload products from `my-shop.html`. Owner/Admin roles can manage all products from `admin.html`. Product images are stored as compressed data URLs in localStorage for this static demo, so data remains per-browser and is not shared between visitors. GitHub Pages publishes static files directly from the repository.


## Owner/Admin Control Center update
Owner/Admin panel sekarang mencakup role management, moderasi/warn, customer chat claim/reply, product moderation, diskon, site settings, PNG background upload, dan music manager. GitHub Pages mode menyimpan data di localStorage browser; untuk data bersama lintas perangkat diperlukan backend/database.
