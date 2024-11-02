import { Router } from 'express';
import { createExample, deleteExample, getExample, getExamples, updateExample } from '../controllers/example.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const examplesRoutes = Router();

examplesRoutes.get('/examples', authRequired, getExamples);

examplesRoutes.get('/examples/:id', authRequired, getExample);

examplesRoutes.post('/examples', authRequired, createExample);

examplesRoutes.delete('/examples/:id', authRequired, deleteExample);

examplesRoutes.put('/examples/:id', authRequired, updateExample);

export default examplesRoutes