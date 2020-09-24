var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Defino una funcion de mongoose que me permite crear esquemas
var Schema = mongoose.Schema;

var rolesValidos = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol permitido',
};

var hospitalSchema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es necesario'] },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario'],
  },
  password: { type: String, required: [true, 'La contraseña es necesaria'] },
  img: { type: String, required: false },
  role: {
    type: String,
    required: false,
    default: 'USER_ROLE',
    enum: rolesValidos,
  },
});

hospitalSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

// Exporto el esquema para poder utilizarlo en otras partes
module.exports = mongoose.model('Usuario', hospitalSchema);
