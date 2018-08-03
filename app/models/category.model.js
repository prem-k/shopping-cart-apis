const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    parent_category : String,
    name: String,
    status: Number,
    added_on : Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);
