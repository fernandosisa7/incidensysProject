import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import { createAccident, deleteAccident, getAccident, getAccidents, updateAccident } from '../controllers/accident.controller.js';

const accidentsRoutes = Router();

accidentsRoutes.get('/accidents', authRequired, getAccidents);

accidentsRoutes.get('/accidents/:id', authRequired, getAccident);

accidentsRoutes.post('/accidents', authRequired, createAccident);

accidentsRoutes.delete('/accidents/:id', authRequired, deleteAccident);

accidentsRoutes.put('/accidents/:id', authRequired, updateAccident);

export default accidentsRoutes