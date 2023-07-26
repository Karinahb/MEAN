const Fecha = require("../models/Fechas");


exports.obtenerFechas = async (req,res) => {    
    try {    
        const fechas = await Fecha.find();      
        return res.json(fechas);    
   } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
    
}

exports.obtenerFecha = async (req,res) => {    
    try {    
       let fecha = await Fecha.findById(req.params.id);

       if(!fecha){
        return  res.status(404).json({msg:'No existe la fecha'})
       }

      

       fecha = await Fecha.findOneAndUpdate({_id:req.params.id},fecha,{new:true})
       return res.json(fecha);

    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
    
}


