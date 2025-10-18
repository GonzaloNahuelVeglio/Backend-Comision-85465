import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import mountSwagger from './docs/swagger.js';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import __dirname from './utils/index.js';
import dotenv from 'dotenv'

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirnameApp = path.dirname(__filename);

dotenv.config()

// Silencia warning y se prepara para Mongoose 7
mongoose.set('strictQuery', false);

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL

mountSwagger(app);
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de ejemplo con Swagger",
      version: "1.0.0",
      description: "Documentación de la API usando Swagger",
    },
  },
  apis: [path.join(__dirnameApp, "docs/*.yaml")],
};

app.use(express.json());
app.use(cookieParser());

// Configurar middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirnameApp, 'public')));

const swaggerSpec = swaggerJsdoc(options);

// Ruta de Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);

// Ruta principal sirve el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirnameApp, 'public', 'index.html'));
});


async function start() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('✅ Mongo conectado')

    app.listen(PORT, () => {
      console.log(`🚀 Listening on ${PORT}`)
    })
  } catch (err) {
    console.error('❌ Error conectando a Mongo:', err.message)
    process.exit(1) 
  }
}

start()

process.on('SIGTERM', async () => {
  await mongoose.connection.close()
  process.exit(0)
})
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})

