const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Validar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Email o contraseña inválida',
      });
    }

    // Validar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        mensaje: 'Email o contraseña inválida',
      });
    }

    // Generar token
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revise los logs',
    });
  }
};

module.exports = {
  login,
};
