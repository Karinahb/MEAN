//Ruta para productos
const express = require('express');
const router = express.Router();
const fechaController = require('../controllers/fechaController');

//api/fechas

router.get('/',fechaController.obtenerFechas);
router.get('/:id',fechaController.obtenerFecha);

module.exports = router;