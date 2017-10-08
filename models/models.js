var Sequelize = require("sequelize");

var sequelize = new Sequelize({
    username: 'nethanelkohen',
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'blog'
});

var Posts = sequelize.define('post',{
    title: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
});

Posts.sync();

module.exports = Posts;
