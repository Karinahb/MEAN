const mongoose = require('mongoose');

const ProductoSchema = mongoose.Schema({
nombre:{
    type: String,
    required: 'Please enter your nombre',
},
categoria:{
    type: String,
    required:true
},
ubicacion:{
    type: String,
    required:true
},
stock:{
    type: Number,
    required:true
},
precio:{
    type: Number,
    required:true
},
fechaCreacion:{
    type: Date,
    default: Date.now
}

});

module.exports = mongoose.model('Producto',ProductoSchema);