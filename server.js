
const express = require("express");
const mongoose = require("mongoose")
const routes = require("./routes")
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const accountSid = 'AC2fb8d220216f5ab01516a689f341af30' || process.env.TWILIO_ACCOUNT_SID;
const authToken = '1efd74c4937b760e728621e5c125a1a4'||process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);






// // Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// // Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
}

// // Define API routes here



// Send every other request to the React app

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/producky", {
  useNewURLParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})


// Define any API routes before this runs
app.use(routes)

app.post("/api/twilio", (req, res) => {
   console.log('sending message')
   client.messages
  .create({
     body: req.body.message || 'hello world',
     from: '+12056221692',
     to: '+1' + req.body.number || '6478638146'
   })
  .then(message => res.send(message.sid));
 });


app.listen(PORT, () => {
   console.log(`🌎 ==> API server now on port ${PORT}!`);
});
