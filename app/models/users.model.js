const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: String,
    email: String,
    password : String,
    type : Number,
    address : String
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);
