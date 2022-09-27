const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

//middleware
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.json());

app.use('/api', require('./api'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});
app.get('/*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
});

module.exports = app;
