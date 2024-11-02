import { Router } from 'express';
import { createEmployee, deleteEmployee, getEmployees, getEmployee, updateEmployee } from '../controllers/employee.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/employees', authRequired, getEmployees);

router.get('/employees/:id', authRequired, getEmployee);

router.post('/employees', authRequired, createEmployee);

router.delete('/employees/:id', authRequired, deleteEmployee);

router.put('/employees/:id', authRequired, updateEmployee);

export default router