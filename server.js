//-------------------- Dependencies ----------------------------

// NPM
var express = require('express');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Faker = require('Faker');





// CUSTOM
var configDB = require('./config/database.js');

// Initialize packages
var app = express();
var router = express.Router();

// configuration
mongoose.connect(configDB.url); // connect to our database

// set up our express application
app.set('superSecret', 'randomizationpassword');
app.use(morgan('dev'));                                     // log every request to the console
app.use(bodyParser.json());                                 // get information from html forms
app.use(bodyParser.urlencoded({extended: true}));         // get url-encoding?
app.use(cors());                                            // allow cross origin information to be transferred

//express third party routing
app.use(express.static(__dirname + '/public'));
app.set('views', [__dirname + '/public/app', __dirname + '/public/ext_resources', __dirname + '/public/ext_resources/ui-bootstrap']);
app.engine('html', require('ejs').renderFile);

//temporary practice router
var User = require('./models/user');
router.get('/populateDatabase', function (req, res) {
    for(var i=0; i < 100; i++) {
        var user = new User({
            firstName: Faker.Name.firstName(),
            lastName: Faker.Name.lastName(),
            email: Faker.Internet.email(),
            imagePath: Faker.Image.avatar(),
            accountType: 'Fan',
            password: "password",
            DOB:  new Date(Faker.Date.past()),
            location: {
                country: Faker.Address.ukCountry(),
                city: Faker.Address.city()
            }
        });

        user.save(function(err) {
            if(err) console.log(err);

        });
    }
    res.json({message: "100 users added to database" })
});

//show list of users
router.get('/listOfUsers', function(req,res) {
    //find users
    User.find({}, 'firstName lastName', function(err, doc) {
        console.log(doc);
        res.json(doc);
    }).skip(50).limit(20).lean();
});

app.use(router);

require('./config/api')(router, app, jwt);

/*
 // routes ======================================================================
 require('./config/routes.js')(app, passport, jwt); // load our routes and pass in our app and fully configured passport
 */

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);