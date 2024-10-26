import { Router } from 'express';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/task.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router();

// http://localhost:4000/api/tasks con postman en get
router.get('/tasks', authRequired, getTasks);

// http://localhost:4000/api/tasks/65fce440d77b03410e01556c
router.get('/tasks/:id', authRequired, getTask);

// http://localhost:4000/api/tasks metodo post
// {
//     "title": "mi tarea",
//     "description": "tarea description"
// }
router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask);

// http://localhost:4000/api/tasks/65fce440d77b03410e01556c en su metodo delete
router.delete('/tasks/:id', authRequired, deleteTask);

// http://localhost:4000/api/tasks/65fce449d77b03410e015570  en su metodo put
// {
//     "title": "mi tarea actualizada",
//     "description": "tarea description actualizada"
// }
router.put('/tasks/:id', authRequired, updateTask);

export default router