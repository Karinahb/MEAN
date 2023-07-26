//Ruta para productos
const express = require('express');
const router = express.Router();
const listaController = require('../controllers/listaController');

//api/listas


router.get('/', listaController.obtenerListas);

module.exports = router;