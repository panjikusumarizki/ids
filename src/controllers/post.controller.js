const db = require('../models');
const Post = db.posts;
const Op = db.Sequelize.Op;

// Create a Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: 'Content can not be empty'
        });
        return;
    }

    // Create Post
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    Post.create(post)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occured while creating the post'
            });
        });
};

// Retrieve All
exports.findAll = (req, res) => {}

// Find by ID
exports.findOne = (req, res) => {}

// Update a Post
exports.update = (req, res) => {}

// Delete a Post
exports.delete = (req, res) => {}

// Delete All Post
exports.deleteAll = (req, res) => {}

// Find all Published Post
exports.findAllPublished = (req, res) => {}