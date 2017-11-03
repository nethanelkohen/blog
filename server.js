const express = require('express');
const app = express();
// const pg = require('pg');
const bodyParser = require('body-parser');
const Posts = require("./src/models/models.js");

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;',
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });

app.set('view engine', 'pug');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/projects', (request, response) => {
  response.render('projects');
});

app.get('/contact', (request, response) => {
  response.render('contact');
});

app.get('/blog', (request, response) => {
  Posts.findAll().then(results => {
    response.render('blog', {
      results
    });
  });
});

app.get('/post', (request, response) => {
  response.render('post');
});

app.post('/post', (request, response) => {
  Posts.sync().then(() => {
    Posts.create({
      title: request.body.title,
      body: request.body.msg
    });
    response.redirect('/blog');
  });
});

app.get('/portfolio/:projectId', (request, response) => {

  const projects = {
    1: 'SoundCloud',
    2: 'Instagram Clone',
    3: 'Rotten Tomatoes',
    4: 'Final'
  };

  const data = {
    projectTitle: projects[request.params.projectId]
  };

  response.render('portfolio', data);
});

app.get('/jukebox', (request, response) => {
  response.render('jukebox');
});

app.get('*', (request, response) => {
  response.render('404');
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Your server is available at localhost:3000!");
});
