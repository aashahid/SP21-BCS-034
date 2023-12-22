const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
let cookieParser = require("cookie-parser");
var session = require("express-session");
const flash = require('express-flash');
// const flash = require('connect-flash');

// Set up middleware to serve static files from the 'public' directory
app.use(express.static('public'));
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(session({ secret: "Shh, its a secret!" }));
app.use(flash());

// Set the view engine to 'ejs'
app.set('view engine', 'ejs');
app.use('/stylesheets', express.static(__dirname + 'public/stylesheets'))

const sessionauth = require("./middleware/session_auth");
app.use('/', require('./routes/site'))
app.use('/', require('./routes/auth'))
app.use('/api/products', require('./routes/api/product'))
app.use('/api/users', require('./routes/api/user'))
app.use('/admin', sessionauth, require ('./routes/admin/admin'))


// Start the server
app.listen(5000, () => {
  console.log(`Server is running at http://localhost:5000`);
});

mongoose
  .connect("mongodb://127.0.0.1/app", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));