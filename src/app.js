// src/app.js
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routes/mocks.router.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';

const app = express();
const { MONGODB_URI, PORT = 8080 } = process.env;

app.use(express.json());

 async function start() {
  try {
     // await mongoose.connect(MONGODB_URI, { dbName: 'backend3' });
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB conectado:', mongoose.connection.host);

    // Routers
    app.use('/api/mocks', mocksRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/pets', petsRouter);

    app.get('/', (req, res) => {
      res.send('¡Servidor funcionando correctamente!');
    });

    app.listen(PORT, () => {
      console.log(`🚀 Server escuchando en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  }
}

start();

 process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('🔌 MongoDB desconectado. Saliendo…');
  process.exit(0);
});

export default app;
