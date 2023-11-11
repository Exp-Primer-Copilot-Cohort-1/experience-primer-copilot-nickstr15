// Create a web server
// 1. /comments/new
// 2. /comments/delete
// 3. /comments/edit

// 1. /comments/new
// 2. /comments/delete
// 3. /comments/edit

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// 1. /comments/new
router.post('/new', (req, res) => {
    // Get the data from the form
    // Create a new comment
    // Redirect to the home page
    Comment.create(req.body, (err, comment) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// 2. /comments/delete
router.delete('/delete/:id', (req, res) => {
    // Get the id from the url
    // Delete the comment with the given id
    // Redirect to the home page
    Comment.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// 3. /comments/edit
router.put('/edit/:id', (req, res) => {
    // Get the id from the url
    // Update the comment with the given id
    // Redirect to the home page
    Comment.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

module.exports = router;
