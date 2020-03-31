// Requires (importacion de librerias)
var express = require('express');
var mongoose = require('mongoose');

// Inicializar variables
var app = express();

// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');

// Conexion a la base de datos
mongoose.connection.openUri(
  'mongodb://localhost:27017/hospitalDB',
  (err, res) => {
    // En caso que suceda un error se detiene todo el proceso
    if (err) throw err;

    console.log('Base de datos  \x1b[32m%s\x1b[0m', 'online');
  }
);

// Rutas
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);

// Escuchar peticiones en un puerto determinado
app.listen(3000, () => {
  // Agrego color a la palabra para diferenciarlas
  console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});
