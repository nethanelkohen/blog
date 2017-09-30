var express = require('express');
var app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname));

app.get('/', function(request, response){
  response.render('index');
});

app.get('/projects', function(request, response){
  response.render('projects');
});

app.get('/contact', function(request, response){
  response.render('contact');
});

app.get('/about', function(request, response){
  response.render('about');
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

app.get('*', function(request, response){
  response.render('404');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
