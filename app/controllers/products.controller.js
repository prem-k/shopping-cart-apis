const Products = require('../models/products.model.js');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body || !req.body.name) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    Products.findOne({'name':req.body.name, 'parent_category' : req.body.parent_category})
    .then(name => {

        if(name) {
            res.send({   
                status : false,
                errors : { name : 'This Product already exist with the selected category' },
                data : name 
            });
        }else{    
            // Create a user
            const products = new Products({
                name: req.body.name, 
                status: req.body.status, 
                parent_category: req.body.parent_category,     
                discount: req.body.discount,
                price: req.body.price,
                total_items: req.body.total_items,
                meta_keyword: req.body.meta_keyword,
                meta_description: req.body.meta_description,
                description: req.body.description
            });

            // Save user in the database
            products.save()
            .then(data => {
                res.send({   
                    status : true,
                    msg : 'Data saved',
                    data : name 
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Products."
                });
            });           
        }

    });    
    
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    let searchKey = req.query.key;
    let parent_category = req.query.parent_category;
    let searchObj = {};
    if(parent_category){
        searchObj.parent_category = parent_category;
    }
    if(searchKey){
        searchObj = { $text: { $search: searchKey } };
    }
    //console.log('searchObj',searchObj);
    Products.find(searchObj).sort({_id : -1})
    .then(category => {
        res.send(category);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Products."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    Products.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    // Find user and update it with the request body
    Products.findByIdAndUpdate(req.params.userId, {
        title: req.body.title || "Untitled user",
        content: req.body.content
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    Products.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};