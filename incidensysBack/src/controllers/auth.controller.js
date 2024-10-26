import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { createAccessToken } from '../libs/jwt.js';
import User from '../models/user.model.js';

export const register = async (req, res) => {
    // console.log(req.body); muestra lo que llega del body
    const { email, password, username } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["The email already exists"]); //si ya hay un email termina la ejecucion y retorna un error

        const passwordHash = await bcrypt.hash(password, 10); //aqui me encripta la contraseña y da unos caracteres aleatorios kjfsdl

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save(); // aqui me guarda en la db mongodb
        const token = await createAccessToken({ id: userSaved._id }); //aqui se crea el token con respecto al id del usuario
        res.cookie('token', token)  //crea una cokkie con el token q se creo
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAT: userSaved.updatedAt
        }); //responde los datos del usuario como respuesta
    } catch (error) {
        res.status(500).json({ message: error.message }); // en caso de error responde un json con el msj de error y un codigo 500
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email }); //encuentra un usario q conincida con el email q viene de req.body
        if (!userFound) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, userFound.password); //compara la password del body con la password del userFound(encriptada por eso se usa bcrypt)
        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

        const token = await createAccessToken({ id: userFound._id }); //aqui se crea el token con respecto al id del usuario encontrado
        res.cookie('token', token);  //crea una cokkie con el token q se creo
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAT: userFound.updatedAt
        }); //responde los datos del usuario como respuesta
    } catch (error) {
        res.status(500).json({ message: error.message }); // en caso de error responde un json con el msj de error y un codigo 500
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });  //setea la cookie como vacia ""
    return res.sendStatus(200)
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id); // encuentra un usuario de db que conicida con el id que esta seteado en req.user.id este req.user se seteo en la funcion authRequired
    if (!userFound) return res.status(400).json({ message: 'User not found' });
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
};

// esto verifica q el usuario exista y se hace cada ves q la pag cargue
export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });
        const userFound = await User.findById(user.id);

        if (!userFound) return res.status(401).json({ message: 'Unauthorized' });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};