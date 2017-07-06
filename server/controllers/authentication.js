const User = require("../models/user")
const jwt = require('jwt-simple');
const axios = require('axios');
const nodemailer = require('nodemailer');
const config = process.env.goldcoin ? {goldcoin: process.env.goldcoin} : require('../config');
const tokenz = process.env.SLACK_TOKEN || require('./config').token;
const mongoose = require("mongoose");
const url_pre = "https://slack.com/api/";

function tokenForUser(user) {
  const time = new Date().getTime();
  return jwt.encode({ sub: user.email, iat: time }, config.goldcoin)
}
function find_user(user, pw) {

}
exports.signup = function(req, res, next) {
  // Check for All Variables
  if (!req.body.email || !req.body.password) {
    return res.status(422).send({statusMessage: "Email and Password are Required."})
  }
  const email = req.body.email.toLowerCase(), password = req.body.password;
    // Check Email for a User
  User.findOne({email: email}, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
    // IF Email contains a User, Run Error
      return res.status(422).send({statusMessage: "Email is in use."})
    }
    const user = new User({
      email: email,
      password: password
    });
    User.findById(user._id, function(err, existingUser) {
      if (existingUser) {
      // IF Email contains a User, Run Error
        return res.status(422).send({statusMessage: "ID is in use."})
      }
        // IF User does NOT exist, create and save User
      user.save(function(err) {
        if (err) {
          return next(err);
        }
          //Respond to request indicating the user was created
          console.log("Created User");
        return res.status(200).json({statusMessage: "Success, User Created!", token: tokenForUser(user)});
      })
    })
  })
};

//Logged In: Recieve token
exports.login = function(req, res, next) {
  return res.status(200).send({statusMessage: "Success, User Found!", token: tokenForUser(req.user)});
}

exports.invite = function(req, res, next) {
  if (!req.body.email || !req.body.first_name || !req.body.last_name) {
    return res.status(400).json({statusMessage: "Please Provide Email Address, First Name, and Last Name"})
  }
  var email = req.body.email,
  first_name = req.body.first_name,
  last_name = req.body.last_name,
  start_date = req.body.start_date,
  end_date = req.body.end_date,
  password = req.body.password,
  channel = "C0M2B9JAH"; // #general
  var url = url_pre+"/users.admin.invite"+"?token="+tokenz+"&email="+email+"&last_name="+last_name+"&first_name="+first_name+"&resend=true"+"&channels="+channel;
  var send_data = {token: tokenz, "channels": channel, email, resend: "true", first_name, last_name}
  axios.post(url, send_data).then(function(response) {
    var ok = response.data.ok;
    if (ok == false) {
      if (response.data.error == 'already_invited') {
        return res.status(200).json({statusMessage: "Already Invited"});
      }
      else if (response.data.error == 'sent_recently') {
        return res.status(200).json({statusMessage: "Email Was Sent Recenetly, Check Your Spam"});
      }
      else if (response.data.error == 'already_in_team') {
        return res.status(200).json({statusMessage: "Congratulations! You are already part of the team!"});
      }
      return res.status(409).json({statusMessage: "Data Sent Is Invalid"});
    }
    // Check Email for a User
    User.findOne({email: email}, function(err, existingUser) {
      if (err) {
        return next(err);
      }
      if (existingUser) {
      // IF Email contains a User, Run Error
        return res.status(422).json({statusMessage: "Email is in use."})
      }
      const user = new User({
        email: email,
        password: password,
        start_date: start_date,
        end_date: end_date,
        first_name: first_name,
        last_name: last_name
      });
      User.findById(user._id, function(err, existingUser) {
        if (existingUser) {
        // IF Email contains a User, Run Error
          return res.status(422).json({statusMessage: "ID is in use."})
        }
          // IF User does NOT exist, create and save User
        user.save(function(err) {
          if (err) {
            return res.status(500).json({statusMessage: "Server Error", error: response.data.error});
          }
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.R || config.R,
              pass: process.env.S || config.S
            }
          });
          var newText = first_name + " " + last_name + " @ " + email;
          var newSubject = 'NEW USER: '+first_name+' '+last_name+' Signed Up';
          var mailOptions = {
            from: process.env.R || config.R,
            to: process.env.P || config.R,
            subject: newSubject,
            text: newText
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }

            //Respond to request indicating the user was created
            console.log("Created User");
            return res.status(201).json({statusMessage: "Success, User Invite Sent!", token: tokenForUser({email: email})});
          });
        })
      })
    })
  })
  .catch(function(response) {
    return res.status(500).json({statusMessage: "Server Error", error: response.data.error});
  })
}
