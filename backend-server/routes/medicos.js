/*
  Root: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.js');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
} = require('../controllers/medicos');

const router = Router();

// ====================================
// Obtener todos los medicos
// ====================================
router.get('/', getMedicos);

// ====================================
// Actualizar medico
// ====================================
router.put('/:id', [], actualizarMedico);

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
router.delete('/:id', eliminarMedico);

module.exports = router;
