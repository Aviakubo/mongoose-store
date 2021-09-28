// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/products.js');


// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

// ROUTES
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Index - display all products
app.get('/products', (req, res) => {
	Book.find({}, (error, allProducts) => {
		res.render('index.ejs', {
			products: allProducts,
		});
	});
});

// New - display form to add a new product
app.get('/products/new', (req, res) => {
	res.render('new.ejs');
});

// Delete - delete a single item

// Update - update a single item

// Create - create a new item
app.post('/products', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products');
    });
});

// Edit - display form to update a book

// Show - display a single book
app.get('/books/:id', (req, res) => {
	Book.findById(req.params.id, (err, foundBook) => {
		res.render('show.ejs', {
			book: foundBook,
		});
	});
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));