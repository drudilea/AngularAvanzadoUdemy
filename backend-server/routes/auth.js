/*
  Root: /api/login
*/

const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
  '/',
  [
    check('password', 'La contraseña es obligatoria').notEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos,
  ],
  login
);

router.post(
  '/google',
  [
    check('token', 'El token de Google es obligatorio').notEmpty(),
    validarCampos,
  ],
  googleSignIn
);

module.exports = router;
