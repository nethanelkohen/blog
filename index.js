var express = require('express');
var app = express();
var pg = require('pg');
var bodyParser = require('body-parser');
var Posts = require("./models/models.js");
// var sql = require("./util/sql.js");
// const { Client } = require('pg');
//
// const client = new Client({
//   connectionString: 'postgres://localhost:5432/blog',
//   ssl: true,
// });
//
// client.connect();
//
// client.query('SELECT public, posts FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });

var sequelize = require('sequelize-heroku').connect();

if (sequelize)
{
    sequelize.authenticate().then( function() {
        var config = sequelize.connectionManager.config;
        console.log('sequelize-heroku: Connected to '+config.host+' as '+config.username+'.');

        sequelize.query('SELECT 1+1 as test').then( function(res) {

            console.log('1+1='+res[0].test);

        });

    }).catch( function(err) {
        var config = sequelize.connectionManager.config;
        console.log('Sequelize: Error connecting '+config.host+' as '+config.user+': '+err);
    });
}
else
{
    console.log('No environnement variable found.');
}

app.set('port', (process.env.PORT || 5000));

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
  };

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

// sql.sync().then(function() {
// 	console.log("Database initialized!");

app.listen(process.env.PORT || 3000, function() {
	console.log("Your server is available at localhost:3000!");
	});
// });
