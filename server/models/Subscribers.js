const {model, Schema} = require('mongoose');

const Subscribers = new Schema({
    nickname: {type: String, unique: true, required: true},
    subs: {type: Array, required: true, default: []}
})


module.exports = model("Subscribers", Subscribers);