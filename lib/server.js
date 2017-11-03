'use strict';

var express = require('express');
var app = express();
// const pg = require('pg');
var bodyParser = require('body-parser');
var Posts = require("./models/models.js");

var _require = require('pg'),
    Client = _require.Client;

var client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', function (err, res) {
  if (err) throw err;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = res.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var row = _step.value;

      console.log(JSON.stringify(row));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  client.end();
});

app.set('view engine', 'pug');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
  response.render('index');
});

app.get('/projects', function (request, response) {
  response.render('projects');
});

app.get('/contact', function (request, response) {
  response.render('contact');
});

app.get('/blog', function (request, response) {
  Posts.findAll().then(function (results) {
    response.render('blog', {
      results: results
    });
  });
});

app.get('/post', function (request, response) {
  response.render('post');
});

app.post('/post', function (request, response) {
  Posts.sync().then(function () {
    Posts.create({
      title: request.body.title,
      body: request.body.msg
    });
    response.redirect('/blog');
  });
});

app.get('/portfolio/:projectId', function (request, response) {

  var projects = {
    1: 'SoundCloud',
    2: 'Instagram Clone',
    3: 'Rotten Tomatoes',
    4: 'Final'
  };

  var data = {
    projectTitle: projects[request.params.projectId]
  };

  response.render('portfolio', data);
});

app.get('/jukebox', function (request, response) {
  response.render('jukebox');
});

app.get('*', function (request, response) {
  response.render('404');
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Your server is available at localhost:3000!");
});