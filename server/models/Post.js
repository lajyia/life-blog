const {Schema, model} = require('mongoose');

const Post = new Schema({
    title: {type: String, required: true, unique: true},
    body: {type: String, required: true},
    viewed: {type: Number, required: true, default: 0},
    likes: {type: Number, required: true, default: 0},
    comments: {type: Number, required: true, default: 0},
    author: {type: String, required: true},
    image: {type: String}
})

module.exports = model('Post', Post);