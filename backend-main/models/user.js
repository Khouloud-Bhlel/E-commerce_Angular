const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: "user",
        required: false
    },
isActive: {
        type: Boolean,
        default: true,
        required: false
    },

   avatar :{

        type: String,

        required: false

        }    ,


},
{
    timestamps: true,
},
);
module.exports=mongoose.model('User',userSchema)
