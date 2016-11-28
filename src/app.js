/* global module, require */

var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.normalize(__dirname + '/../dist')));

module.exports = app;