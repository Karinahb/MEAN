const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';


exports.createUser = async (req,res) =>{
    const newUser = {
        name: req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password)
    }

    User.create(newUser, (err, user) => {
        if (err && err.code === 11000) return res.status(409).send('Email already exists');
        if (err) return res.status(500).send('Server error');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
          SECRET_KEY, {
            expiresIn: expiresIn
          });
        const dataUser = {
          name: user.name,
          email: user.email,
          accessToken: accessToken,
          expiresIn: expiresIn
        }
        // response 
        res.send({ dataUser });
      });
    }


    exports.loginUser = (req, res, next) => {
        const userData = {
          email: req.body.email,
          password: req.body.password
        }
        User.findOne({ email: userData.email }, (err, user) => {
          if (err) return res.status(500).send('Server error!');
      
          if (!user) {
            // Email no existe
            res.status(409).send({ message: 'Email no existe' });
          } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
              const expiresIn = 24 * 60 * 60;
              const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
      
              const dataUser = {
                name: user.name,
                email: user.email,
                accessToken: accessToken,
                expiresIn: expiresIn
              }
              res.send({ dataUser });
            } else {
              // password wrong
              res.status(409).send({ message: 'Algo salio mal' });
            }
          }
        });
      }

  
     
exports.obtenerUsuarios = async (req,res) => {    
  try {    
      const usuarios = await User.find();
      console.log(usuarios)
      return res.json(usuarios);    
  } catch (error) {
      console.log(error);
      return res.status(500).send('Hubo un error');
  }
  
}


exports.obtenerUsuario = async (req,res) => {  
 try {    
    let usuario = await User.findById(req.params.id);
    if(!usuario){
     return  res.status(404).json({msg:'No existe el producto'})
    }
    usuario = await User.findOneAndUpdate({_id:req.params.id},usuario,{new:true})
    return res.json(usuario);
 } catch (error) {
     return res.status(500).send('Hubo un error');
 }
 
}

exports.eliminarUsuario = async (req,res) => {   
 try {               
     let usuario = await User.findById(req.params.id);
     if(!usuario){
      return res.status(404).json({msg:'No existe el usuario'})
     }
    await User.findOneAndRemove({_id:req.params.id})
    return  res.json({msg:'Usuario eliminado exitosamente'});
   }catch (error) {
     console.log(error)
      return  res.status(500).send('Hubo un error');
  }
  
}  


exports.actualizarUsuario = async (req,res) => {    
  try {    
      const {name,email,password} = req.body;
     let usuario = await User.findById(req.params.id);
      console.log(usuario)
     if(!usuario){
      return  res.status(404).json({msg:'No existe el usuario'})
     }

     usuario.name = name;
     usuario.email = email;
     usuario.password = password;    

     usuario = await User.findOneAndUpdate({_id:req.params.id},usuario,{new:true})
     return  res.json(usuario);
  } catch (error) {
      console.log(error);
      return  res.status(500).send('Hubo un error');
  }
  
}
