import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/tasks.routes.js';

const app = express(); // app es la app del servidor

// app.use(cors()); //para que se puedan comunicar todos los dominios
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true //para que se puedan establecer cookies desde front a backend
}));  //para solucionar error de cors
app.use(morgan('dev')); // app usa morgan, me muestra por consola las peticiones q van llegando
app.use(express.json()); // para q la app del server, pueda recibir los body y convertirlos en formato JSON
app.use(cookieParser()); // para que se puedan leer las cookies en formato json

app.use('/api', authRoutes);  // app ejecuta las rutas de auth (login, register)
app.use('/api', taskRoutes);  // app ejecuta las rutas de taskRoutes

export default app;