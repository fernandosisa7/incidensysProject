import { Router } from 'express';
import { createExample, deleteExample, getExample, getExamples, updateExample } from '../controllers/example.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { saveExampleSchema } from '../schemas/example.schema.js';
import { validateSchema } from '../middlewares/validator.middleware.js';

const router = Router();

router.get('/examples', authRequired, getExamples);

router.get('/examples/:id', authRequired, getExample);

router.post('/examples', authRequired, validateSchema(saveExampleSchema), createExample);

router.delete('/examples/:id', authRequired, deleteExample);

router.put('/examples/:id', authRequired, validateSchema(saveExampleSchema), updateExample);

export default router