const {model, Schema} = require('mongoose');


const Comment = new Schema({
    post: {type: String, required: true, unique: true},
    comments: {type: Array, required: true, default: []}
})


module.exports = model('Comment', Comment);