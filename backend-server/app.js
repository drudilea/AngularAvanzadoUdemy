// Requires (importacion de librerias)
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Inicializar variables
var app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Body Parser (middleware para parsear el body en los POST)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexion a la base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

// Escuchar peticiones en un puerto determinado
app.listen(process.env.PORT, () => {
  // Agrego color a la palabra para diferenciarlas
  console.log(`Express server puerto ${process.env.PORT}: online`);
});
