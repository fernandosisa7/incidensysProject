import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../config.js";

// Funcion q genera un token con respecto a un payload q se le pasa 
export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: '1d'
            },
            (err, token) => {
                if (err) reject(err);
                resolve(token)
            }
        ); // aqui se genera el token con respecto al id del usuario, token es pase para usuarios authenticados en string    
    });
};
