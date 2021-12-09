const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    guild: { type: String, unique: true, required: true }, // user id
    playing: { type: Boolean, default: false }
    queue: { type: Array }
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)
