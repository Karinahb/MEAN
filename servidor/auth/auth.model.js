
//'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        required:true,
        trim: true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        trim: true
    }
},{
   timestamps:true
});

module.exports = userSchema;
//module.exports = mongoose.model('Usuario',userSchema);

