import { Router } from 'express';
import { createIncident, deleteIncident, getIncident, getIncidents, updateIncident } from '../controllers/incident.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const incidentsRoutes = Router();

incidentsRoutes.get('/incidents', authRequired, getIncidents);

incidentsRoutes.get('/incidents/:id', authRequired, getIncident);

incidentsRoutes.post('/incidents', authRequired, createIncident);

incidentsRoutes.delete('/incidents/:id', authRequired, deleteIncident);

incidentsRoutes.put('/incidents/:id', authRequired, updateIncident);

export default incidentsRoutes