# Stage 9: AI log

## Tools
- Gemini
- 

## Key requests
### 1. Express backend
- **Asked**: Build the stage 9 backend from the PDF guide, adapted to the CineSync theme.
- **Got**: `backend/` with `app.js`, `server.js`, `routes/filme.js`, `validation.js`, CORS, 404 route and central error handler.
- **Changed or rejected**: Fields and values adapted (`titlu`, `tip`, `an`, `vazut`), seed data from the README. Texts without diacritics.

### 2. Frontend changes
- **Asked**: Remove json-server and show the server error message.
- **Got**: `api.js` reads `body.error`; `db.json`, the `api` script and the `json-server` dependency were removed.

## What I learned / what did not work
Server side validation is needed even with a validated form. CORS is solved on the server. An old json-server still running on port 3001 answered instead of the new API, so it must be stopped first.
