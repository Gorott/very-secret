const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    user: { type: String, unique: true, required: true},
    balance: {
        bank: { type: Number, default: 0 },
        wallet: { type: Number, default: 0 },
    },
    xp: {
        xp: { type: Number, default: 0 },
        totalxp: { type: Number, default: 0 },
        level: { type: Number, default: 1 }
    }
    
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)