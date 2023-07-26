const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
//Creamos el servidor
const app = express();


//Conectamos a la BD
conectarDB();
app.use(cors());
app.use(express.json());

//app.use(bodyParserJson);
//app.use(bodyParserURLEncoded);



app.use('/api/productos', require('./routes/productos'));
app.use('/api',require('./auth/auth.routes'));
app.use('/api/fechas',require('./routes/fechas'));
app.use('/api/listadatos',require('./routes/listas'));


app.listen(4000,()=>{
    console.log('El servidor esta corriendo perfectamente');
})