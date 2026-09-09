# Veyltharyn — Public Hosting / 24-7 Deployment

This build uses **PHP + SQLite**. It does not require MariaDB/MySQL.

## Requirements

- PHP 8.1+ recommended
- PDO + PDO_SQLITE enabled
- Apache with `.htaccess` support, or equivalent web-server rules
- HTTPS enabled
- Writable `database/` and `uploads/` directories
- A persistent filesystem (not an ephemeral/serverless deployment)

## Important

Do **not** deploy this build to GitHub Pages. GitHub Pages serves static files and cannot execute the PHP API.

## SSH / Terminal hosting

From the project directory:

```bash
bash setup_hosting.sh
php tools/create_owner.php
```

Then point the domain/document root at this directory and enable HTTPS.

## cPanel / File Manager hosting

1. Upload the project ZIP and extract it into the domain's document root.
2. Ensure PHP has **PDO_SQLITE** enabled.
3. Make `database/` and `uploads/` writable by the PHP process.
4. Run `setup_hosting.sh` if SSH/Terminal is available.
5. Run `php tools/create_owner.php` once to create/reset the owner account.
6. Enable HTTPS and use the HTTPS site URL.

If the host has no SSH/Terminal, ask the host to enable PDO_SQLITE and provide a way to initialize the SQLite database. Do not expose `tools/create_owner.php` as a public web page.

## Database persistence

The live database is:

`database/veyltharyn.sqlite`

Back it up regularly. Never commit or publicly upload this file.

## Upload security

Uploaded files are stored under `uploads/`. The included rules deny execution of common server-side script extensions. The API also validates uploaded image MIME types and size.

## HTTPS / cookies

The API uses an HTTP-only session cookie. On HTTPS hosting the cookie is marked Secure automatically.

## Production checklist

- [ ] HTTPS works
- [ ] PDO_SQLITE is enabled
- [ ] Register works
- [ ] Login works
- [ ] Logout works
- [ ] SQLite data remains after restarting PHP
- [ ] VNCoins/Gacha/Vouchers work
- [ ] Marketplace/Orders work
- [ ] Notifications/Chat work
- [ ] Owner account created through CLI only
- [ ] `database/veyltharyn.sqlite` is not publicly downloadable
- [ ] `config/` and `tools/` are not publicly accessible
- [ ] `uploads/` cannot execute PHP/scripts
- [ ] Automated backups are configured
