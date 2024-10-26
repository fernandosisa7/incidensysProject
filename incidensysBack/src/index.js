import app from './app.js';
import { connectDB } from './db.js';

connectDB(); //conectate a la db mongodb
app.listen(4000); // app de server escucha en el puerto 4000
console.log('Server on port ', 4000)

