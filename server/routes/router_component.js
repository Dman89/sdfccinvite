const express  = require('express');
const passport = require('passport');
module.exports = function(app) {
  app.use("/", express.static('public'));
  app.use("/confirm", express.static('public'));
  app.use("/signup", express.static('public'));
}
