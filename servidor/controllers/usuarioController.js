const Usuario = require("../models/Usuario");



exports.obtenerUsuarios = async (req,res) => {    
    try {    
        const usuarios = await Usuario.find();
        console.log(usuarios)
        return res.json(usuarios);    
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error');
    }
    
}


exports.obtenerUsuario = async (req,res) => {  
   try {    
      let usuario = await Usuario.findById(req.params.id);
      if(!usuario){
       return  res.status(404).json({msg:'No existe el producto'})
      }
      usuario = await Usuario.findOneAndUpdate({_id:req.params.id},usuario,{new:true})
      return res.json(usuario);
   } catch (error) {
       return res.status(500).send('Hubo un error');
   }
   
}

exports.eliminarUsuario = async (req,res) => {   
   try {               
       let usuario = await Usuario.findById(req.params.id);
       if(!usuario){
        return res.status(404).json({msg:'No existe el usuario'})
       }
      await Usuario.findOneAndRemove({_id:req.params.id})
      return  res.json({msg:'Usuario eliminado exitosamente'});
     }catch (error) {
       console.log(error)
        return  res.status(500).send('Hubo un error');
    }
    
}