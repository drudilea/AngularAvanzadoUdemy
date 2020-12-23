/*
  Root: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const {
  getMedicos,
  getMedicoById,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} = require('../controllers/medicos');

const router = Router();

// ====================================
// Obtener todos los medicos
// ====================================
router.get('/', validarJWT, getMedicos);

// ====================================
// Actualizar medico
// ====================================
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').notEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    validarCampos,
  ],
  actualizarMedico
);

// ====================================
// Crear un nuevo medico
// ====================================
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').notEmpty(),
    check('hospital', 'El hospital id debe ser valido').isMongoId(),
    validarCampos,
  ],
  crearMedico
);

// ====================================
// Eliminar un medico por id
// ====================================
router.delete('/:id', validarJWT, eliminarMedico);

// ====================================
// Obtener un médico por id
// ====================================
router.get('/:id', validarJWT, getMedicoById);

module.exports = router;
