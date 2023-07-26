//Ruta para usuarios
const express = require('express');
const router = express.Router();
//const usuarioController = require('../controllers/usuarioController');
const usuarioController = require('../controllers/productoController');




//api/usuarios
router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id',usuarioController.obtenerUsuario);
router.delete('/:id',usuarioController.eliminarUsuario);
module.exports = router;

