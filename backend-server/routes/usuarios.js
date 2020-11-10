/*
  Root: /api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');

const router = Router();
const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require('../controllers/usuarios');

// ====================================
// Obtener todos los usuarios
// ====================================
router.get('/', validarJWT, getUsuarios);

// ====================================
// Actualizar usuario
// ====================================
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El usuario es obligatorio').notEmpty(),
    check('role', 'El role es obligatorio').notEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
  ],
  actualizarUsuario
);

// ====================================
// Crear un nuevo usuario
// ====================================
router.post(
  '/',
  [
    check('nombre', 'El usuario es obligatorio').notEmpty(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
  ],
  crearUsuario
);

// ====================================
// Eliminar un usuario por id
// ====================================
router.delete('/:id', validarJWT, eliminarUsuario);

module.exports = router;
