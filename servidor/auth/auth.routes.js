//Ruta para productos
const express = require('express');
const router = express.Router();
const Users = require('./auth.controller');


    //api
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
    

router.get('/users', Users.obtenerUsuarios);
router.get('/users/:id',Users.obtenerUsuario);
router.delete('/users/:id',Users.eliminarUsuario);
router.put('/users/:id',Users.actualizarUsuario);


    module.exports = router;
