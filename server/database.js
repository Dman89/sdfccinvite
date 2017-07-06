const mongoose = require('mongoose');
mongoose.connect(process.env.T ? process.env.T : require("./config").T, function(err) {
  if (err) {
    console.log("Error Connecting");
  } else {
    console.log('Connected to MongoDB!')
  }
})
