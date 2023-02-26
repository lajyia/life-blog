const {model, Schema} = require('mongoose');

const Subscribers = new Schema({
    user: {type: String, required: true, unique: true},
    subs: {type: Array, required: true, default: []}
})


module.exports = model("Subscribers", Subscribers);