// ======== REQUIRE/DEPENDENCIES ========
const express = require('express');
const itemRouter = express.Router();
const Store = require('../models/products');

// ======== ROUTES ========

// Index 
itemRouter.get('/', (req, res) =>{
    // let qty =  - parseInt(store.qty)
    Store.find({}, (error, allStores) =>{
        res.render('index.ejs', {
            store: allStores
        });
    });
});


// New
itemRouter.get('/new', (req, res) =>{
    res.render('new.ejs');
});

// Delete
itemRouter.delete('/:id', (req, res) =>{
    Store.findByIdAndRemove(req.params.id, (err, data) =>{
        res.redirect('/store');
    });
});


// Update
itemRouter.put('/:id', (req, res) =>{
    Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, updatedStore) =>{
        res.redirect(`/store/${req.params.id}`);
    });
});

// Create
itemRouter.post('/', (req, res) =>{
    Store.create(req.body, (error, createdStore) =>{
        res.redirect('/store');
    });
});

// Edit
itemRouter.get('/:id/edit', (req, res) =>{
    Store.findById(req.params.id, (error, foundStore) =>{
        res.render('edit.ejs', {
            store: foundStore
        });
    });
});

// Show
itemRouter.get('/:id', (req, res) =>{
    Store.findById(req.params.id, (err, foundStore) =>{
        res.render('show.ejs', {
            store: foundStore,
        });
    });
});


// ======== EXPORT ========
module.exports = itemRouter;