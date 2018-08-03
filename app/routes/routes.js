module.exports = (app) => {

    const users = require('../controllers/users.controller.js');
    const category = require('../controllers/category.controller.js');
    const products = require('../controllers/products.controller.js');

    // Create a new Note
    app.post('/add-user', users.create);
    app.post('/user-login', users.login);
    // Retrieve all users
    app.get('/users-list', users.findAll);
    // Retrieve a single Note with id
    app.get('/users/:id', users.findOne);
    // Update a Note with id
    app.put('/users/:id', users.update);
    // Delete a Note with id
    app.delete('/users/:id', users.delete);


    app.post('/category/add-category', category.create);
    app.get('/category-list', category.findAll);

    app.post('/products/add', products.create);
    app.get('/products', products.findAll);

}
