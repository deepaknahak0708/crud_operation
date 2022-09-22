const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstname: {
        type: String
    },

    lastname: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    }, 
    password:{
        type:String
    },
    image:{
        type:String
    },

    resume:{
        type:String
    },
    video:{
        type: String
    },

    role:{
        type: String,
        default: "user"
    },
    
    verified:{
        type:String,
        default: 'false'
    }

})


const user = mongoose.model('user', userSchema);
module.exports = user;