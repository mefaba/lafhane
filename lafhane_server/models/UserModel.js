const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique: true,
        minlength: 3
    },
    socket_id: {
        type:String,
        required:false,
        default: "anonym"
    },
    score: {
        type:Number,
        required:false,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User',UserSchema)