const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const deleteUser = require("../services/deleteUser");
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});
const User = require('../models/user');
module.exports = function(app) {
  app.get('/api/profile', requireAuth, function(req, res) {
    res.status(200).send({user: req.user});
  })
  app.post('/api/signup', Authentication.signup);
  app.post('/api/signin', requireLogin, Authentication.login);
  app.post('/api/channelInvite', Authentication.invite);
  app.get('/api/check_user/:email', function(req, res) {
    var email = req.params.email;
    User.findOne({email: email}, function(err, existingUser) {
      if (err) {
        return next(err);
      }
      if (existingUser) {
      // IF Email contains a User, Run Error
        return res.status(200).json({ok: false, statusMessage: "Email is in use."})
      }
      else {
        return res.status(200).json({ok: true})
      }
    });
  })


  app.delete('/api/a666Route', deleteUser);



}
