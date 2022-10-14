const mongoose  = require('mongoose');
const uniqueValidator  = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        avatar: { type: String, required: true},
    });
imageSchema.plugin(uniqueValidator);

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
