const { Schema, model } = require('mongoose');

const User = new Schema({
    nickname: { type: String, required: true, unique: true },
    linkName: { type: String, required: true, unique: true },
    password: { type: String, requried: true },
    bio: { type: String, required: true, default: 'this is my bio' },
    subscribers: { type: Number, required: true, default: 0 },
    likes: { type: Number, required: true, default: 0 },
    avatar: {type: String},
    posts: [
        {
            type: Object,
            ref: "Post"
        }
    ],
    liked: {type: Array, required: true, default: []},
})


module.exports = model('User', User)
