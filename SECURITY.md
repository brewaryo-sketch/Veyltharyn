# Veyltharyn security deployment notes

Implemented in the application: password hashing, secure session cookie settings, prepared SQL statements, role and ownership checks, CSRF-ready API structure, input validation, upload MIME/size validation, profanity moderation logging, audit logs, login logs and notification records.

Required at infrastructure/deployment level: HTTPS, a WAF/DDoS provider (for example Cloudflare or an equivalent), database backups, firewall rules, secrets in environment variables, and real email/SMS verification providers.

Owner security: the owner account is `brewaryo@gmail.com`. No Gmail password is stored by this package. 2FA/passkey must be enabled at the identity provider or through a production WebAuthn/2FA integration; this package does not fake verification.

Identity verification: do not upload/store raw KTP/selfie files in this package. Use a compliant external identity-verification provider and store only verification status and the minimum required result.

Run `php tools/create_owner.php 'STRONG_PASSWORD'` on the server once to create/update the owner account. Never put that password in source code or chat.
