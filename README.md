# CoderHouse Backend — Entrega Final

API REST con **Express 5**, **Mongoose 8**, **dotenv**, **bcryptjs**, **Swagger** y **Docker**. Incluye endpoints CRUD para *users*, *pets* y *adoptions*, documentación con Swagger, tests funcionales y despliegue con Docker.

---

## ✨ Características
- **Stack**: Node.js ≥ 18, Express 5, Mongoose 8
- **Routers**:
  - `/api/users`: CRUD de usuarios (documentado con Swagger)
  - `/api/pets`: CRUD de mascotas
  - `/api/adoptions`: Gestión de adopciones
  - `/api/sessions`: Gestión de sesiones
- **DB**: MongoDB (soporte para **local** y Atlas vía `.env`)
- **Seguridad**: variables de entorno con `dotenv`; contraseñas encriptadas con `bcryptjs`
- **Documentación**: API documentada con Swagger UI en `/api-docs`
- **Tests**: Tests funcionales con Mocha, Chai y Supertest
- **Docker**: Imagen disponible en DockerHub para fácil despliegue

---

## 📁 Estructura del proyecto
```
.
├─ .env                       # variables locales (NO commitear)
├─ .gitignore
├─ Dockerfile                 # configuración para Docker
├─ package.json
├─ README.md
├─ src/
│  ├─ app.js                  # server + conexión a Mongo
│  ├─ routes/
│  │  ├─ users.router.js
│  │  ├─ pets.router.js
│  │  ├─ adoption.router.js
│  │  └─ sessions.router.js
│  ├─ controllers/
│  │  ├─ users.controller.js
│  │  ├─ pets.controller.js
│  │  ├─ adoptions.controller.js
│  │  └─ sessions.controller.js
│  ├─ dao/
│  │  ├─ Adoption.js
│  │  ├─ Pets.dao.js
│  │  ├─ Users.dao.js
│  │  └─ models/
│  ├─ docs/
│  │  ├─ openapi-users.yaml   # documentación Swagger
│  │  └─ swagger.js
│  ├─ dto/
│  │  ├─ Pet.dto.js
│  │  └─ User.dto.js
│  ├─ public/
│  │  ├─ img/
│  │  ├─ index.html
│  │  ├─ script.js
│  │  └─ style.css
│  ├─ repository/
│  │  ├─ AdoptionRepository.js
│  │  ├─ GenericRepository.js
│  │  ├─ PetRepository.js
│  │  └─ UserRepository.js
│  └─ utils/
│     ├─ index.js
│     └─ uploader.js
└─ test/
   ├─ adoptions.test.js
   ├─ bcrypt.test.js
   ├─ pets.test.js
   └─ supertest.test.js
```

---

## ⚙️ Requisitos
- **Node.js** 18 o 20
- **MongoDB** local o remoto (Atlas)
 
---

## 🔑 Configuración (.env)
Crear un archivo **`.env`** en la raíz (no subir al repo):
```env
MONGODB_URI=mongodb://localhost:27017/backend3
PORT=8000
```
> Si usás Atlas, pegá tu cadena completa en `MONGODB_URI`.

---

## 🧰 Instalación y ejecución

### Método 1: Instalación local
```bash
npm install
npm run dev   # nodemon
# o
npm start     # node src/app.js
```

### Método 2: Usando Docker
```bash
url: https://hub.docker.com/r/gonzanahuel/coder-adopt-api
# Opción 1: Usar la imagen de DockerHub
docker pull gonzanahuel/coder-adopt-api
docker run -p 8000:8000 gonzanahuel/coder-adopt-api
 
# Opción 2: Construir la imagen localmente
docker build -t coder-adopt-api .
docker run -p 8000:8000 coder-adopt-api
```

### Acceso a la aplicación
```
GET http://localhost:8000/         # Página principal
GET http://localhost:8000/api-docs # Documentación Swagger
```

## 🧪 Ejecución de tests
```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos de adopciones
npm test -- -g "Adopciones"
```

---

## 🧱 Modelos (Mongoose)
### User (`src/dao/models/user.model.js`)
- `first_name`: String, **required**
- `last_name`: String, **required**
- `email`: String, **required**, **unique**
- `age`: Number
- `password`: String, **required**
- `role`: String (`user` | `admin`)
- `pets`: [ObjectId], **ref:** `'pets'`

### Pet (`src/dao/models/pet.model.js`)
- `name`: String, **required**
- `specie`: String, **required**
- `owner`: ObjectId, **ref:** `'users'`
 

---

## 🚦 Endpoints

### Base mounts (en `src/app.js`)
- `/api/users` → `users.router.js`
- `/api/pets` → `pets.router.js`
- `/api/mocks` → `mocks.router.js`

### Users `/api/users`
- `GET /` — lista usuarios
- `GET /:userId` — busca por id (valida ObjectId)
- `POST /` — crea usuario *(ver nota sobre password)*
- `PUT /:userId` — actualiza
- `DELETE /:userId` — elimina

 
### Pets `/api/pets`
- `GET /` — lista mascotas
- `GET /:petId` — busca por id (valida ObjectId)
- `POST /` — crea mascota
- `PUT /:petId` — actualiza
- `DELETE /:petId` — elimina

### Mocks `/api/mocks`
- `GET /mockingusers` — **paramétrico sugerido**: `?count=N` → genera N usuarios *faker* (por defecto 50)
- `GET /mockingpets` — genera 100 mascotas *faker*
- `POST /generateData` — inserta en BD usuarios y mascotas
  - **Body**: `{ "users": <num>, "pets": <num> }`

---

## 🧪 Ejemplos (Postman)

### Generar usuarios mock (paramétrico)
- Método: **GET**
- URL: `http://localhost:8000/api/mocks/mockingusers?count=5`

### Insertar BD (users + pets)
- Método: **POST**
- URL: `http://localhost:8000/api/mocks/generateData`
- Headers:  
    - `Content-Type: application/json`
- Body (raw, JSON):
    ```json
    {
        "users": 20,
        "pets": 20
    }
    ```

### Listar colecciones
- Método: **GET**
- URL: `http://localhost:8000/api/users`
- Método: **GET**
- URL: `http://localhost:8000/api/pets` 
 

## ✅ Checklist de la consigna
- [x] Router **`/api/mocks`** con endpoints de mocking
- [x] `GET /mockingpets` dentro de `/api/mocks`
- [x] Módulo de **mocking de usuarios** con:
  - password **`coder123`** encriptada (bcryptjs)
  - `role` ∈ {`user`,`admin`}
  - `pets`: `[]`
- [x] `POST /generateData` para insertar *users* y *pets*
- [x] `GET /mockingusers` **paramétrico** por query (`?count=N`)  

---
 

## 🧩 Scripts NPM
```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
}
```
 

## 👥 Autores
-Gonzalo Veglio — Backend 3 (Pre-Entrega 1)
