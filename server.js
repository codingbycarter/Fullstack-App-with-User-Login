
const express  = require('express');
const app      = express();
const port     = process.env.PORT || 3555;

const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);



const passport = require('passport');
const flash    = require('connect-flash');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');

const configDB = require('./config/database.js');

let db


mongoose.connect(configDB.url, (err, database) => {
  if (err) return console.log(err)
  db = database 
  require('./app/routes.js')(app, passport, db);
}); 

require('./config/passport')(passport); 


app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))


app.set('view engine', 'ejs'); 

app.use(session({
    secret: 'rcbootcamp2022a', 
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 


app.listen(port);
console.log('The magic happens on port ' + port);