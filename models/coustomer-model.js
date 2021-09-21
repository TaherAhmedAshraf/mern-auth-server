const mongoose = require('mongoose')

const coustomerSchema = new mongoose.Schema({
    name: { type: String, required: true }
})

const coustomer = mongoose.model("coustomer", coustomerSchema)

module.exports = coustomer