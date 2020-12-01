
const express = require("express");
const mongoose = require("mongoose")
const routes = require("./routes")
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const accountSid = 'AC2fb8d220216f5ab01516a689f341af30' || process.env.TWILIO_ACCOUNT_SID;
const authToken = '1efd74c4937b760e728621e5c125a1a4'||process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


// app.use(session({
//    secret: 'this should be secure',
//    resave: true,
//    saveUninitialized: false
// }));
 
// const oidc = new ExpressOIDC({
//    issuer: 'https://dev-7705867.okta.com/oauth2/default',
//    client_id: '0oa1d3kgklSfhS18Z5d6',
//    redirect_uri: 'http://localhost:8080/login/callback',
//    scope: 'openid profile'
// });



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
     body: req.body.message,
     from: '+12056221692',
     to: '+1' + req.body.number
   })
  .then(message => res.send(message.sid));
});

app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(PORT, () => {
   console.log(`🌎 ==> API server now on port ${PORT}!`);
});
