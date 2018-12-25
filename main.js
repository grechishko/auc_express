const express = require('express');

// App initialization and configuration
const app = express();
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

// Modules initialization and configuration
// BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Express Validator
const expressValidator = require('express-validator');
app.use(expressValidator());
// Express Session
const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
    // saveUninitialized: true,
    // cookie: { secure: true }
}));
// Express Messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
// Passport
const passport = require('passport');
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

// Database connection
const config = require('./config/database');
const mongoose = require('mongoose');
mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;
db.once('open', function(){
    console.log('Connected to MongoDB');
});
db.on('error', function(err){
    console.log(err);
});


// Middleware
app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});


// Route
const users = require('./routes/users');
app.use('/user', users);

const lots = require('./routes/lots');
app.use('/lots', lots);

app.get('/', function(req, res){
    res.render('index');
});


app.listen(3000, function(){
    console.log('Listnin in port 3000..');
});