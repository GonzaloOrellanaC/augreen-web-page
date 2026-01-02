# Augreen Backend

Servidor Node.js con TypeScript para integrarse con el frontend Ionic/React.

Rutas principales:
- `POST /api/upload` — recibe campo `file` (multer), guarda en `uploads/` y retorna `{ filename, url }`.
- `POST /api/send-email` — envía email vía Mailgun, body: `{ to, subject, text?, html? }`.
- `GET /api/health` — health check.

Socket.IO:
- Conectarse al mismo host/puerto; origen permitido por `FRONTEND_ORIGIN`.
- Eventos: `hello` → `hello:ack`, `broadcast` → reenviados a otros clientes.

Instalación:

```bash
cd backend
npm install
cp .env.example .env
# Rellenar variables en .env
npm run dev
```
