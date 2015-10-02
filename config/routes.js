module.exports = function(app, passport) {

    var User = require('../models/user.js');

    app.get('/', function(req, res) {
       res.render('index.html');
    });

    app.post('/api/signup', function(req, res) {

        var user = req.body;

        //create new user based on the form
        var newUser = new User({
            //accountType: user.firstName,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            location: {
                country: user.country,
                city: user.city
            }
        });

        console.log(newUser);

        //save the user to the database
        //newUser.save();
    });

    app.post('/api/testRequest', function(req, res) {
        res.send('hit test');
    });

    // Logout
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect();
    });

    app.post('/api/login', passport.authenticate('local-login'), function(req, res) {
        res.send(req.user);
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    //if not authenticated they will be sent to the home page
    res.redirect('/');
}