/*
  Root: /api/login
*/

const { Router } = require('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
  '/',
  [
    check('password', 'La cosntraseña es obligatoria').notEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
  ],
  login
);

module.exports = router;
