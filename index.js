var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var Post = require("./models/models.js");
var Posts = require("./models/models.js");


app.set('view engine', 'pug');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function(request, response){
  response.render('index');
});

app.get('/projects', function(request, response){
  response.render('projects');
});

app.get('/contact', function(request, response){
  response.render('contact');
});

// app.get('/blog', function(request, response){
//   response.render('blog');
// });

app.get('/blog', function(request, response) {
  Posts.findAll().then(function(results) {
    response.render('blog', {
      results
    });
  });
});

app.get('/post', function(request, response) {
  response.render('post');
});

app.post('/post', function(request, response) {
  Posts.sync().then(function() {
    Posts.create({
      title: request.body.title,
      body: request.body.msg
    });
    response.redirect('/blog');
  });
});

app.get('/portfolio/:projectId', function(request, response) {

  var projects = {
    1: 'SoundCloud',
    2: 'Instagram Clone',
    3: 'Rotten Tomatoes',
    4: 'Final'
  }

  var data = {
    projectTitle: projects[request.params.projectId]
  };

  response.render('portfolio', data);
});

app.get('/jukebox', function(request, response){
  response.render('jukebox');
});

app.get('*', function(request, response){
  response.render('404');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
