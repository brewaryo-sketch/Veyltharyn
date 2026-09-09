Veyltharyn Connected Marketplace + VNCoins/Gacha Update
===========================================================

This archive connects the existing GUI to the PHP/MariaDB API for:
- real login/register sessions
- Marketplace product browsing
- product checkout with voucher input/validation
- one-time voucher use
- seller notification when an order is placed
- +100 VNCoins to the buyer when a voucher is successfully used
- daily +1 VNcoin claim
- up to 3 gacha spins per day
- rare 95% OFF gacha reward
- API-backed notifications
- owner/seller order management compatibility

TERMUX
------
1. Stop the old PHP server if it is running (Ctrl+C).
2. Replace your project files with this archive's Veyltharyn folder.
3. Make sure MariaDB is running:
   mariadbd-safe &
4. Apply/update the schema:
   cd ~/storage/downloads/Veyltharyn
   mariadb -u root veyltharyn < database/schema.sql
   The ALTER statements are written to be safe when the new columns already exist.
5. Create/reset the owner account:
   php tools/create_owner.php
   Enter an owner password of at least 8 characters when prompted.
   Do NOT paste the password into chat.
6. Start the local site:
   php -S 0.0.0.0:8080
7. Open:
   http://127.0.0.1:8080/login.html

IMPORTANT
---------
- GitHub Pages cannot execute the PHP API. These connected features work when the frontend is served by PHP or another server that can reach the MariaDB API.
- For production, use a dedicated database user instead of MariaDB root and HTTPS.
- The 95% reward is a rare gacha outcome, not a guaranteed daily reward.
- A voucher can only be consumed once. The +100 VNCoins bonus is issued once for that voucher use.
