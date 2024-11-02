import { Router } from 'express';
import { createEpp, deleteEpp, getEpp, getEpps, updateEpp } from '../controllers/epp.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const eppsRoutes = Router();

eppsRoutes.get('/epps', authRequired, getEpps);

eppsRoutes.get('/epps/:id', authRequired, getEpp);

eppsRoutes.post('/epps', authRequired, createEpp);

eppsRoutes.delete('/epps/:id', authRequired, deleteEpp);

eppsRoutes.put('/epps/:id', authRequired, updateEpp);

export default eppsRoutes