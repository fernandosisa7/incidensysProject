## conceptos backend
- /routes  esta carpeta almacena todos los endpoints o rutas que el front puede pedir
- /models  almacena los modelos de datos de nuestra db 
- /controllers  almacena funciones que se ejecutan cuando se visita una URL
- /schemas para validar datos cuando lleguen al backend

- para crear un servicio si primero se crea el routes, luego models, luego controllers,, y se agrega a app.js, los esquemas son opcionales porque se puede validar tambien con el modelo de mongoose 

- /middlewares son funciones q se ejecutan antes de que lleguen a una ruta ejemplo validateToken para validar q el usuario en verdad esta authenticado
- /libs  guarda codigo q podemos re importar varias veces, ejemplo funcion para generar tokens
- db.js  guarda la conexion a la base de datos mongodb
- config.js  guarda configuraciones q el resto de archivos puede importar ejemplo variables secret para tokens
- app.js para configurar todo el codigo de express del backend
- index.js  este va a arrancar la app, llama el codigo de express, de la db y demas
- para modulos propios se recomienda colocar el .js en los import
- mientras q para modulos de terceros se recomienda sin el .js en los import
- un try catch se usa para q no tumbe el server en caso de fallar o no tumbe el front y engloba todo lo de dentro de una funcion
- los errores de backend se recomienda q el backend siempre responda en response.data = ['error1', 'error2'] para q sea facil de leer por el front, los errores de (consola: error.response.data) son los mismos q se reciben como respuesta en postman

## desde cmd desde la carpeta de backend
- `npm init -y`  me crea el archivo package.json
- `npm i express` instala express
- `"type": "module",` se agrego esta linea en el package.json para que acepte imp y exports y nuevas caracteristicas de JS
- `npm i nodemon -D` para instalar el modulo nodemon y escuchar cambios automaticamente
- `"dev": "nodemon src/index.js"` se agrego esta linea en el package.json para que me lea `npm run dev` e iniciar el server con nodemon
- `npm i morgan` modulo q me permite ver por consola las peticiones q van llegando 
- `npm i mongoose` para instalar mongoose para validar datos de la db
- para `instalar mongodb` buscar en google mongodb download y se instala el msi q sale en community server y ya 
- `extension mongodb` mongodb for vs code, y una nueva conexion y sele da la url mongodb://localhost
- `npm i bcryptjs` modulo para encriptar contraseñas
- `npm i jsonwebtoken` instala el modulo, sirve para generar un token q es como un string q sirve de pase para dejar pasar usuarios authenticados
- `npm i cookie-parser` para q se puedan leer las cokkies en formato json, se necesito configuar en el app.js
- `npm i zod` para instalar zod modulo de validaciones
- `npm i cors` para solucionar error de bloqueo por cors se explica en 2:17 h

## conceptos front
- carpeta /pages para guardar paginas
- carpeta /components  para guardar componentes ejemplo header footer
- carpeta /context para el contexto datos q se compartes con todos los elementos hijo
- carpeta /api guarda las peticiones q se hacen hacia el backend
- ProtectedRoute es un componente q se usa para proteger rutas, q solo se vean cuando se este authenticado

## desde la consola desde la carpeta /incidensysFront
- `npm create vite` para crear el proyecto, se le dio de nombre client y react con js
- `npm i` para crear la carpeta node_modules
- `npm run dev` para correr el server en http://localhost:5173/
- `npm install -D tailwindcss postcss autoprefixer` instala modulos de taiwindcss
- `npx tailwindcss init -p` inicializa tailwind, crea dos archivos tailwin.config.js postcss.config.js
- `content: [` se cambio el content en tailwind.config.js para q lea tailwind
- `npm i react-router-dom` para instalar react-router-dom este se configuro en el app.js para q funcione
- `npm i react-hook-form` para instalar react hook form manejar el cambio de estado y validaciones
- `npm i axios` istala axios para realizar peciones http
- `npm i js-cookie` para poder leer las cookies desde el front
- `npm i dayjs` se instala para formatera fechas
- `npm install xlsx` se instala modulo para generar excel

## para iniciar el proyecto en ambas carpetas front y backend
- se necesita instalar node js, git, mongodb
- la carpeta del front es /client, y la carpeta de back es toda /mernCrudAuth
- front se prueba en http://localhost:5173/ desde google,
- backend se prueba http://localhost:4000/api/register desde postman, ver carpeta routes
- `npm install` para crear node_modules en ambas carpetas
- `npm run dev` para iniciar el proyecto en ambas carpetas

- para ver la db se abre MongodbCompas y new conection no requiere configuracion
- para postman se abre postman y se importa el archivo `tasks.postman_collection.json`

se subio el repositorio a git 

u:      fer23@gmail.com
p:      Admin$23
u:      rayod@gmail.com
p:      Admin$23