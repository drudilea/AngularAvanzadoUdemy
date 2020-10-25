const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res, next) => {
  const hospitales = await Hospital.find().populate('usuario', 'nombre img');
  res.json({
    ok: true,
    hospitales,
  });
};

const crearHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revisar logs',
    });
  }
};

const actualizarHospital = async (req, res = response) => {
  try {
    res.json({
      ok: true,
      mensaje: 'Hospitales UPDATE',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revisar logs',
    });
  }
};

const eliminarHospital = async (req, res = response) => {
  try {
    res.json({
      ok: true,
      mensaje: 'Hospitales DELETE',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error inesperado... Revisar logs',
    });
  }
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  eliminarHospital,
};
