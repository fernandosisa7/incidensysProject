import { Router } from 'express';
import { createExample, deleteExample, getExample, getExamples, updateExample } from '../controllers/example.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/examples', authRequired, getExamples);

router.get('/examples/:id', authRequired, getExample);

router.post('/examples', authRequired, createExample);

router.delete('/examples/:id', authRequired, deleteExample);

router.put('/examples/:id', authRequired, updateExample);

export default router