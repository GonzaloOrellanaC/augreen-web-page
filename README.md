# augreen-web-page

Monorepo para la web de Augreen (frontend + backend).

## Descripción

Proyecto monorepo que contiene la aplicación frontend (Ionic/Vite/React + TypeScript) y el backend (Node.js + TypeScript). Diseñado para desarrollo local y despliegue separado de frontend y backend.

## Estructura principal

- `backend/`: servidor Node/TypeScript, contiene `package.json`, `src/`.
- `frontend/`: aplicación web (Vite + React + Ionic), contiene `src/`, `public/`, `cypress/`.

Ejemplo de archivos importantes:

- `backend/package.json` — scripts y dependencias del backend.
- `frontend/package.json` — scripts y dependencias del frontend.

## Requisitos

- Node.js (recomendado >= 16)
- npm o yarn

## Instalación y ejecución (desarrollo)

1. Instalar dependencias raíz opcional (si hay workspace scripts):

```bash
# desde la raíz (opcional)
npm install
```

2. Backend

```bash
cd backend
npm install
# Ejecutar en modo desarrollo (revisar scripts en backend/package.json)
npm run dev    # o `npm start` si está definido
```

3. Frontend

```bash
cd frontend
npm install
npm run dev    # arranca Vite/Ionic en modo desarrollo
```

Si algún script difiere, revisa `package.json` correspondiente.

## Build y despliegue

- Backend: `cd backend && npm run build` (si hay proceso de compilación) y desplegar según tu plataforma (Heroku, Azure, VPS, etc.).
- Frontend: `cd frontend && npm run build` para generar los assets estáticos que puedas servir desde un CDN o servidor web.

## Tests

- Frontend E2E: la carpeta `frontend/cypress/` contiene pruebas e2e. Ejecuta `npx cypress open` o añade el script definido en `package.json`.
- Frontend unit: `npm test` (si está configurado en `frontend/package.json`).

## Lint y formateo

- Revisa `eslint.config.js` y scripts en `package.json`. Ejecuta `npm run lint` o `npm run format` si están definidos.

## Comandos y despliegue

- Desarrollo local (desde la raíz, usa `concurrently`):

```bash
# desde la raíz
npm install
npm run dev
```

- Nota: `npm run dev` lanza `start:backend:dev` y `start:frontend` en paralelo.

- Despliegue en servidor (requiere `pm2` instalado globalmente en el servidor):

```bash
# Build frontend
cd frontend
npm install
npm run build

# Build backend y arrancar con pm2 (en el servidor)
cd ../backend
npm install
npm run build
pm2 start npm --name augreen-backend -- start
```

- Alternativamente, desde la raíz puedes ejecutar solo el backend en producción (usa pm2 global):

```bash
npm run start:backend:prod
```

- Nota técnica: el backend está preparado para servir el contenido estático generado en `frontend/dist`. Asegúrate de ejecutar `npm run build` en `frontend` antes de desplegar si quieres que el backend sirva la SPA.

## Contribuir

- Abre un issue para discutir cambios importantes.
- Crea una rama por feature (`feature/mi-cambio`) y un PR con descripción clara.
- Asegúrate de ejecutar linters y tests antes de enviar el PR.

## Contacto y mantenimiento

- Mantén dependencias actualizadas y revisa `package.json` en ambas carpetas.
- Para dudas o acceso, abre un issue en este repositorio.

## Licencia

Este repositorio no especifica licencia. Añade `LICENSE` si quieres un permiso explícito (por ejemplo MIT).
