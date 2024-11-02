import { Router } from 'express';
import { createExample, deleteExample, getExample, getExamples, updateExample } from '../controllers/example.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const accidentsRoutes = Router();

accidentsRoutes.get('/accidents', authRequired, getExamples);

accidentsRoutes.get('/accidents/:id', authRequired, getExample);

accidentsRoutes.post('/accidents', authRequired, createExample);

accidentsRoutes.delete('/accidents/:id', authRequired, deleteExample);

accidentsRoutes.put('/accidents/:id', authRequired, updateExample);

export default accidentsRoutes