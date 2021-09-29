// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/products');
const methodOverride = require('method-override');
const MONGODB_URL = process.env.MONGODB_URL;


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
app.use(express.json());
app.use(methodOverride('_method'));

// ROUTES
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// Index - display all products
app.get('/products', (req, res) => {
	Product.find({}, (error, allItems) => {
		res.render('index.ejs', {
			items: allItems,
		});
	});
});

// New - display form to add a new product
app.get('/products/new', (req, res) => {
	res.render('new.ejs');
});

// Delete - delete a single item
app.delete('/products/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/products');
	});
});


// Update - update a single item
app.put('/products/:id', (req, res) => {
	Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	}, (error, updatedItem) => {
		res.redirect(`/products/${req.params.id}`);
	});
});

// Create - create a new item
app.post("/products", (req, res) => {
    // original res.send to send body
    // res.send(req.body);

    Product.create(req.body, (error, createdItem) => {
        res.redirect('/products');
    });
});

// Edit - display form to update an item
app.get('/products/:id/edit', (req, res) =>  {
	Product.findById(req.params.id, (err, foundItem) => {
		res.render('edit.ejs', {
			item: foundItem
		});
	});
});

// Show - display a single item
app.get('/products/:id', (req, res) => {
	Product.findById(req.params.id, (err, foundItem) => {
		res.render('show.ejs', {
			item: foundItem,
		});
	});
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listning on port: ${PORT}`));