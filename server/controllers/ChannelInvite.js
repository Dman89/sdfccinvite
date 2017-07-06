var axios = require("axios");
var nodemailer = require('nodemailer');
var url_pre = "https://slack.com/api/";
const tokenz = process.env.SLACK_TOKEN || require('./config').token;

exports.invite = function(req, res, next) {
  if (!req.body.email || !req.body.first_name || !req.body.last_name) {
    return res.status(400).json({statusMessage: "Please Provide Email Address, First Name, and Last Name"})
  }
  var email = req.body.email,
  fn = req.body.first_name,
  ln = req.body.last_name,
  password = req.body.password,
  channel = "C3NLM01MJ"; // #general
  var url = url_pre+"/users.admin.invite"+"?token="+token+"&email="+email+"&last_name="+ln+"&first_name="+fn+"&resend=true"+"&channels="+channel;
  var send_data = {"token": token, "channels": channel, "email": email, resend: "true", "first_name": fn, "last_name": ln}
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
        password: password
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
              user: '1stloveyourself@gmail.com',
              pass: 'SKIN$DAWN420'
            }
          });
            var newText = fn + " " + ln + " @ " + email;
            var newSubject = 'NEW USER: '+fn+' '+ln+' Signed Up';
          var mailOptions = {
            from: '1stloveyourself@gmail.com',
            to: '1stloveyourself@gmail.com',
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
            console.log("Created User !");
            return res.status(201).json({statusMessage: "Success, User Invite Sent!"});
          });
        })
      })
    })
  })
  .catch(function(response) {
    return res.status(500).json({statusMessage: "Server Error", error: response.data.error});
  })
}
