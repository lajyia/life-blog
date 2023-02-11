const {Schema, model} = require('mongoose');

const Image = new Schema({
    name : { type: String, required: true},
    img : {
        data: Buffer, contentType: String
    }
})

module.exports = model("Image", Image);