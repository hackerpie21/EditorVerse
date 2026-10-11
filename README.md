## Backend development notes
The API starts from `server/index.js`. SQLite tables initialize automatically from `server/db.js`.
Before deploying publicly, implement authentication, authorization, rate limiting, file signature validation/malware scanning, object storage, production database migrations, backups, and stricter CORS.
