const mongoose = require('mongoose');
const FechasSchema = mongoose.Schema({

    fecha:{
        type: Date,
        required:true
    }

});

module.exports = mongoose.model('Fecha',FechasSchema);