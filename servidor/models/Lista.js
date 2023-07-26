const mongoose = require('mongoose');

const ListaSchema = mongoose.Schema({
dato:{
    type: String,
    required:true
},
monto:{
    type: Number,
    required:true
}
});

module.exports = mongoose.model('listadedatos',ListaSchema);