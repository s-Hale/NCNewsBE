if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';


const express = require('express');
const app = express();
const apiRouter = require('./routes/index');
const mongoose = require('mongoose');
const config = require('./config');

let db = process.env.DB || config.DB[process.env.NODE_ENV];
let port = process.env.PORT || config.PORT[process.env.NODE_ENV];


mongoose.Promise = Promise;

mongoose.connect(db)
  .then(() => console.log(`successfully connected to...${db}`))
  .catch(err => console.log('connection failed', err));

app.use('/api', apiRouter);

app.use('/*', (req, res) => res.status(404).send('Page not found'));

app.use((err, req, res, next) => res.status(500).send(err));

app.listen(port, function () {		
  console.log(`listening on port ${port}`);		
});

module.exports = app;