import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

// un middleware es una funcion q se ejecuta antes de llegar a la ruta
//necesita estos 3 params para considerarse un middleware incluido el next
// esta funcion valida q el token este, y q sea generado por nostros con verify de jwt
export const authRequired = (req, res, next) => {   
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;  //se guarda el user en req.user
        next(); //es para continuar porque hay otra funcion despues de esta
    })
};