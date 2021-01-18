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
        })
};

// Retrieve All
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Post.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occured while find post'
            });
        })
};

// Find by ID
exports.findOne = (req, res) => {
    const id = req.params.id

    Post.findByPk(id)
        .then((data) => {
            if (data.id) {
                res.send(data);
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `error retrieving post with id ${id}`
            });
        })
}

// Update a Post
exports.update = (req, res) => {
    const id = req.params.id;
    
    Post.update(req.body, {
        where: { id: id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: 'Post was updated successfully'
            });
        } else {
            res.send({
                message: `Cannot update post with id ${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: `Error updating post wiht id ${id}`
        })
    })
}

// Delete a Post
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: { id: id }
    }).then((result) => {
        if (result == 1) {
            res.send({
                message: 'Post was deleted successfully'
            })
        } else {
            res.send({
                message: `Cannot delete post with id ${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: `Could not delete post with id ${id}`
        })
    })
}

// Delete All Post
exports.deleteAll = (req, res) => {
    Post.destroy({
        where: {},
        truncate: false
    }).then((result) => {
        res.send({
            message: `${result} Posts were deleted successfully!`
        });
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occured while removing all posts.'
        });
    })
}

// Find all Published Post
exports.findAllPublished = (req, res) => {
    Post.findAll({
        where: { published: true }
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured retrieving posts"
        })
    });
}