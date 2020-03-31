var mongoose = require('mongoose');

// Defino una funcion de mongoose que me permite crear esquemas
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  password: { type: String, required: [true, 'La contraseña es necesaria'] },
  img: { type: String, required: false },
  role: { type: String, required: false, default: 'USER_ROLE' }
});

// Exporto el esquema para poder utilizarlo en otras partes
module.exports = mongoose.model('Usuario', usuarioSchema);
