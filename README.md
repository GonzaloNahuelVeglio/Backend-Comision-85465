# CoderHouse Backend 3 — Pre-Entrega 1

API REST con **Express 5**, **Mongoose 8**, **dotenv**, **bcryptjs** y **@faker-js/faker**. Incluye endpoints CRUD para *users* y *pets*, y un router de *mocks* para generar datos de prueba y sembrar la base.

---

## ✨ Características
- **Stack**: Node.js ≥ 18, Express 5, Mongoose 8
- **Routers**:
  - `/api/users`: CRUD de usuarios
  - `/api/pets`: CRUD de mascotas
  - `/api/mocks`: generación de usuarios/mascotas (*faker*) y seed de BD
- **DB**: MongoDB (soporte para **local** y Atlas vía `.env`)
- **Seguridad**: variables de entorno con `dotenv`; mock de usuarios con contraseña encriptada (`coder123` → `bcryptjs`)

---

## 📁 Estructura del proyecto
```
.
├─ .env                       # variables locales (NO commitear)
├─ .gitignore
├─ package.json
├─ README.md
└─ src/
   ├─ app.js                  # server + conexión a Mongo
   ├─ routes/
   │  ├─ users.router.js
   │  ├─ pets.router.js
   │  └─ mocks.router.js
   ├─ dao/
   │  └─ models/
   │     ├─ user.model.js
   │     └─ pet.model.js
   └─ utils/
      ├─ user.mocking.js
      └─ pet.mocking.js
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
PORT=8080
```
> Si usás Atlas, pegá tu cadena completa en `MONGODB_URI`.

---

## 🧰 Instalación y ejecución
```bash
npm install
npm run dev   # nodemon
# o
npm start     # node src/app.js
```
### Saludo del servidor
```
GET http://localhost:8080/
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
- `species`: String, **required**
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
- URL: `http://localhost:8080/api/mocks/mockingusers?count=5`

### Insertar BD (users + pets)
- Método: **POST**
- URL: `http://localhost:8080/api/mocks/generateData`
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
- URL: `http://localhost:8080/api/users`
- Método: **GET**
- URL: `http://localhost:8080/api/pets` 
 

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

---

## 🆘 Troubleshooting
- **ECONNREFUSED 127.0.0.1:27017** → Mongo no está corriendo. Iniciar servicio o contenedor.
- **Unique email** al re-seed → borrar colección `users` o variar datos mock.
- **Puerto en uso** → cambiar `PORT` en `.env`.

---

## 📜 Licencia
A definir por el equipo (MIT sugerida).

---

## 👥 Autores
-Gonzalo Veglio — Backend 3 (Pre-Entrega 1)
