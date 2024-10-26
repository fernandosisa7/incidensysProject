// funcion para validar un schema
export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); //valida lo que viene del body con ayuda del schema
        next();
    } catch (error) {
        return res.status(400).json(error.errors.map(error => error.message));
    }
} 