import { Router } from 'express';
import { createRisk, deleteRisk, getRisk, getRisks, updateRisk } from '../controllers/risk.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const risksRoutes = Router();

risksRoutes.get('/risks', authRequired, getRisks);

risksRoutes.get('/risks/:id', authRequired, getRisk);

risksRoutes.post('/risks', authRequired, createRisk);

risksRoutes.delete('/risks/:id', authRequired, deleteRisk);

risksRoutes.put('/risks/:id', authRequired, updateRisk);

export default risksRoutes