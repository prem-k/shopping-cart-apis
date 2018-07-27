const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: String,
    email: String,
    password : String,
    phone : Number,
    gender : String,
    country : String,
    type : Number,
    zip_code : Number,
    status : String,
    address : String
}, {
    timestamps: true
});

module.exports = mongoose.model('Users', UsersSchema);
