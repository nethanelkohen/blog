"use strict";

var Sequelize = require("sequelize");

if (process.env.DATABASE_URL) {
  var _sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres"
  });
}

var Posts = sequelize.define('post', {
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