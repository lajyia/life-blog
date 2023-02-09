const {Schema, model} = require('mongoose');

const User = new Schema({
    nickname: {type: String, required: true, unique: true},
    linkName: {type: String, require: true, unique: true},
    password: {type: String, requrie: true},
    bio: {type: String, required: true, default: 'this is my bio'},
    subscribers: {type: Number, required: true, default: 0},
    likes: {type: Number, required: true, default: 0},
})


module.exports = model('User', User)