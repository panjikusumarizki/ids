const { Sequelize } = require("sequelize/types");
const { sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('post', {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Post;
}