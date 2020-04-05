var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

// ====================================
// Verificar token
// ====================================

exports.verificaToken = function (req, res, next) {
  // Si no se envia el token por query, se toma como undefined y no se autoriza a seguir
  var token = req.query.token;

  jwt.verify(token, SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        mensaje: 'Token incorrecto',
        errors: err,
      });
    }

    // Adjunto el usuario que realiza la peticion, es decir, el usuario autenticado
    req.usuario = decoded.usuario;

    next();
  });
};
