/*
  Root: /api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  eliminarHospital,
} = require('../controllers/hospitales');

const router = Router();

// ====================================
// Obtener todos los hospitales
// ====================================
router.get('/', getHospitales);

// ====================================
// Actualizar hospital
// ====================================
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').notEmpty(),
    validarCampos,
  ],
  actualizarHospital
);

// ====================================
// Crear un nuevo hospital
// ====================================
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es obligatorio').notEmpty(),
    validarCampos,
  ],
  crearHospital
);

// ====================================
// Eliminar un hospital por id
// ====================================
router.delete('/:id', validarJWT, eliminarHospital);

module.exports = router;
