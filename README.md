# AI in Development - Copilot Agent Training

## Session 01

Repositorio de laboratorio sobre GitHub Copilot y Cloud Agent.

## Proyecto: JWT Auth App

Aplicación web full-stack con autenticación JWT compuesta por un **backend FastAPI** y un **frontend React**.

### Arquitectura

```
.
├── backend/     # API FastAPI con autenticación JWT
├── frontend/    # App React (login + página de bienvenida protegida)
├── DESIGN.md    # Estándar de diseño del frontend
└── docker-compose.yml
```

### Inicio rápido con Docker Compose

```bash
docker-compose up -d
```

| Servicio  | URL                     |
|-----------|-------------------------|
| Frontend  | http://localhost:3000   |
| Backend   | http://localhost:8000   |

**Credenciales de prueba:** usuario `admin` / contraseña `admin123`

### Desarrollo local

1. **Backend** — ver [backend/README.md](backend/README.md)
2. **Frontend** — ver [frontend/README.md](frontend/README.md)

### Flujo de autenticación

1. El usuario accede a `/login` en el frontend e ingresa sus credenciales.
2. El frontend envía las credenciales al endpoint `POST /token` del backend.
3. El backend valida y devuelve un JWT (válido 300 segundos).
4. El token se almacena en `sessionStorage` del navegador.
5. Las rutas protegidas (como `/welcome`) verifican el token; sin él redirigen a `/login`.
6. El usuario puede cerrar sesión, eliminando el token de la sesión.

## Licencia

MIT
