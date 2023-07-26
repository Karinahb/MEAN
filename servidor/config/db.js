const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});

mongoose.set("strictQuery", true);

const conectarDB = async()=>{
try{
    await mongoose.connect(process.env.DB_MONGO,{
       // useNewUrlParser:true,        
       // useUnifiedTopology:true,
       // useFindAndModify:false      
       
    })
console.log('BD ejecutandose')
}catch(error){
    console.log(error);
    process.exit(1) // Detenemos la App
}
}
module.exports = conectarDB