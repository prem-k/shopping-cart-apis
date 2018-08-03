const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
	status : Number,
	parent_category : String,
    name : String,
    image : String,
    price : Number,
    discount : Number,
    total_items : Number,
    meta_keyword : String,
    meta_description : String,
    description : String

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
