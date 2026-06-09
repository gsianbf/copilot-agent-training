# Frontend — JWT Auth App

Aplicación web React con página de login y página de bienvenida protegida. Se integra con el backend FastAPI para autenticación JWT.

## Tecnologías

- **React 19** — biblioteca de interfaz de usuario
- **Vite** — toolchain de desarrollo y build
- **React Router DOM v7** — enrutamiento del lado del cliente
- **CSS Modules** — estilos con alcance por componente
- **Inter / Geist Mono** — tipografía (Google Fonts)

## Diseño

El diseño sigue el estándar definido en [`DESIGN.md`](../DESIGN.md):

- Canvas negro puro (`#000000`) como fondo.
- Texto en `#fcfdff` (ink).
- Botón primario blanco con texto negro.
- Cards con fondo `#0a0a0c` y borde `rgba(255,255,255,0.14)`.
- Tipografía **Inter** para la UI.
- Atmospheric glows (azul en login, verde en bienvenida).

## Estructura

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx   # Guard de rutas protegidas
│   ├── context/
│   │   └── AuthContext.jsx      # Estado de autenticación (sessionStorage)
│   ├── pages/
│   │   ├── LoginPage.jsx        # Página de login
│   │   ├── LoginPage.module.css
│   │   ├── WelcomePage.jsx      # Página de bienvenida (protegida)
│   │   └── WelcomePage.module.css
│   ├── services/
│   │   └── api.js               # Llamadas al backend
│   ├── App.jsx                  # Rutas principales
│   ├── index.css                # Tokens de diseño globales
│   └── main.jsx                 # Punto de entrada
├── .env.example                 # Variables de entorno de ejemplo
├── Dockerfile                   # Imagen para producción (nginx)
├── nginx.conf                   # Configuración nginx (proxy al backend)
├── package.json
└── vite.config.js
```

## Flujo de autenticación

1. El usuario ingresa usuario y contraseña en `/login`.
2. El frontend llama a `POST /token` del backend con `application/x-www-form-urlencoded`.
3. El token JWT recibido se guarda en `sessionStorage`.
4. La ruta `/welcome` está protegida por `ProtectedRoute`; sin token redirige a `/login`.
5. El botón "Cerrar sesión" elimina el token de `sessionStorage` y redirige a `/login`.

**Credenciales de prueba:**
- Usuario: `admin`
- Contraseña: `admin123`

## Instalación y uso local

### Requisitos

- Node.js 20+
- npm 10+
- Backend corriendo en `http://localhost:8000` (ver [backend/README.md](../backend/README.md))

### Pasos

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (con proxy al backend)
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173**

> El servidor de desarrollo incluye un proxy para `/token`, `/verify` y `/refresh`, por lo que no se necesita configurar CORS durante el desarrollo.

### Variables de entorno

Copiar `.env.example` a `.env.local` para personalizar la URL del backend:

```bash
cp .env.example .env.local
# Editar VITE_API_URL si el backend corre en otro puerto u host
```

## Build de producción

```bash
npm run build
# Los archivos generados quedan en dist/
```

## Despliegue con Docker Compose

Desde la raíz del proyecto:

```bash
docker-compose up -d
```

| Servicio  | URL                     |
|-----------|-------------------------|
| Frontend  | http://localhost:3000   |
| Backend   | http://localhost:8000   |

Para detener:

```bash
docker-compose down
```

## Rutas de la aplicación

| Ruta       | Descripción                              | Requiere sesión |
|------------|------------------------------------------|-----------------|
| `/login`   | Formulario de inicio de sesión           | No              |
| `/welcome` | Página de bienvenida con datos del usuario | Sí            |
| `/*`       | Redirige a `/login`                      | —               |
