module.exports = (app) => {
    const posts = require('../controllers/post.controller');

    let router = require('express').Router();

    router.post('/create', posts.create);
    router.get('/', posts.findAll);
    router.get('/get/:id', posts.findOne);
    router.get('/published', posts.findAllPublished);
    router.put('/update/:id', posts.update);
    router.delete('/delete/:id', posts.delete);
    router.delete('/delete', posts.deleteAll);

    app.use('/api/posts', router);
}