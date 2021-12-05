const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: String,
    password: String,
    access: String,
    refresh: String
})

let userModel = mongoose.model(
    'User',
    userSchema
)

module.exports = userModel

