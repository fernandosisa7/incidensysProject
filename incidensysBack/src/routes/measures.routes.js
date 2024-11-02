import { Router } from 'express';
import { createMeasure, deleteMeasure, getMeasure, getMeasures, updateMeasure } from '../controllers/measure.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const measuresRoutes = Router();

measuresRoutes.get('/measures', authRequired, getMeasures);

measuresRoutes.get('/measures/:id', authRequired, getMeasure);

measuresRoutes.post('/measures', authRequired, createMeasure);

measuresRoutes.delete('/measures/:id', authRequired, deleteMeasure);

measuresRoutes.put('/measures/:id', authRequired, updateMeasure);

export default measuresRoutes