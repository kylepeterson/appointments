// server.js
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
let db = require('./config/db');


const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  const db = database.db("appointmentsdb");
  require('./app/routes')(app, database);
  app.listen(process.env.PORT || port, () => {
    console.log('Listening on  ' + port);
  });
});