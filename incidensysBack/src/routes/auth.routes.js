import { Router } from 'express';
import { login, logout, profile, register, verifyToken } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';

const router = Router();

// http://localhost:4000/api/register en su metodo post
// {
//     "email": "test11@test.com",
//     "password": "asdf123",
//     "username": "test11"
// }
router.post('/register', validateSchema(registerSchema), register);

// http://localhost:4000/api/login en su metodo post
// {
//     "email": "test11@test.com",
//     "password": "asdf123"
// }
router.post('/login', validateSchema(loginSchema), login);

// http://localhost:4000/api/logout en su metodo post me quita el token q esta seteado en una cookie
router.post('/logout', logout);

router.get('/verify', verifyToken);

// http://localhost:4000/api/profile en su metodo get necesita estar authenticado
router.get('/profile', authRequired, profile);

export default router; //estas rutas se ejecutan en el app.js