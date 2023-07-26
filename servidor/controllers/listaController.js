const Lista = require("../models/Lista");

exports.obtenerListas = async (req,res) => {    
    try {    
        const listaDedatos = await Lista.find();     
        console.log(listaDedatos) 
        return res.json(listaDedatos);    
   } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
    
}