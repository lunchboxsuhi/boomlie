//-------------------- Dependencies ----------------------------

// NPM
var express = require('express');
var port = process.env.PORT || 7999;
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Faker = require('Faker');
var fs = require('fs');


// CUSTOM
var configDB = require('./config/database.js');

// Initialize Router
var app = express();
var router = express.Router();

// configuration
mongoose.connect(configDB.url); // connect to our database

// set up our express application
app.set('superSecret', 'randomizationpassword');
app.use(morgan('dev'));                                     // log every request to the console
app.use(bodyParser.json());                                 // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));           // get url-encoding?
app.use(cors());                                            // allow cross origin information to be transferred

//express third party routing
app.use(express.static(__dirname + '/public'));
app.set('views', [__dirname + '/public/app', __dirname + '/public/ext_resources', __dirname + '/public/ext_resources/ui-bootstrap']);
app.engine('html', require('ejs').renderFile);


//Main Load our Angular js app
router.get('/', function (req, res) {
    res.render('index.html');
});

var User = require('./models/user');
router.get('/populateDatabase', function (req, res) {

    for (var i = 0; i < 100; i++) {
        var user = new User({
            firstName: Faker.Name.firstName(),
            lastName: Faker.Name.lastName(),
            email: Faker.Internet.email(),
            profilePic: Faker.Image.avatar(),
            description: Faker.Lorem.sentences(),
            genre: Faker.Lorem.words(),
            following: Math.round((Math.random() * 1000) + 20),
            followers: Math.round((Math.random() * 1000) + 20),
            accountType: 'Fan',
            DOB: new Date(Faker.Date.past()),
            location: {
                country: Faker.Address.ukCountry(),
                city: Faker.Address.city()
            }
        });

        user.password = user.generateHash('password');

        user.save(function (err) {
            if (err) console.log(err);

        });
    }
    res.json({message: "100 users added to database"})
});

//make use of our auth middleware
require('./config/auth')(router, app, jwt);

//show list of users
router.get('/listOfUsers', function (req, res) {
    //find users
    User.find({}, 'firstName lastName', function (err, doc) {
        console.log(doc);
        res.json(doc);
    }).skip(50).limit(20).lean();
});

//load the routes here
require('./config/api')(router, app, jwt);


//************************ Azure UPLOAD API **********************//
//****************************************************************//
//****************************************************************//



//load on the router middleware after it has been initialized and populated with routes
//for pretty urls && allowing refreshing
router.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile('index.html', {root: __dirname + '/public/app'});
});

//Give app the router object to be used.
app.use(router);

/*
 // routes ======================================================================
 require('./config/routes.js')(app, passport, jwt); // load our routes and pass in our app and fully configured passport
 */

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);