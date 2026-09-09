VEYLTHARYN UPDATE
Server: vn-play.myftp.biz:21374
Owner: brewaryo@gmail.com

Added backend/database foundation for VNCoins, marketplace, seller/My Shop, orders, seller chat, CS chat, notifications, reports, moderation, Product IDs, roles, audit/login logs and secure uploads. Existing assets/pages are preserved.

Before production: configure MySQL, import database/schema.sql, set DB_DSN/DB_USER/DB_PASS, run tools/create_owner.php, configure HTTPS/WAF/DDoS, and connect real email/phone/identity verification plus WebAuthn/2FA.
