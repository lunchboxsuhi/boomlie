module.exports = function(app, passport, jwt) {

    var User = require('../models/user.js');

    app.get('/', function(req, res) {
       res.render('index.html');
    });

    app.post('/api/signup', function(req, res) {
        var user = req.body;
        var newUser = new User({
            //accountType: user.firstName,
            accountType: user.accountType,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            DOB: user.DOB,
            location: {
                country: user.location.country,
                city: user.location.city
            }
        });
        console.log(newUser);

        //save the user to the database
        newUser.save(function(err) {
            if (err) throw err;

            console.log("Successfully create user " + user.email);
            res.send(newUser);
        });
    });

    app.post('/api/testRequest', function(req, res) {
        res.send('hit test');
    });

    // Logout
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect();
    });

    /*
    app.post('/api/login', passport.authenticate('local-login'), function(req, res) {
        res.send(req.user);
    });*/

    app.post('/api/authenticate', function(req, res) {
       User.findOne(
           {
               email: req.body.email
           }, function(err, user) {
               if (err) throw err;

               console.log(user);
               if (!user) {
                   res.json({success: false, message: 'Authentication failed. User not found.'});
               } else if (user) {
                   if (user.password != req.body.password) {
                       res.json({ success: false, message: 'Authentication failed. Wrong password.'});
                   }
                   else {
                       var token = jwt.sign(user, app.get('superSecret'), {
                           expiresInMinutes: 1440
                       });

                       res.json({
                           success: true,
                           message: 'Enjoy the token',
                           token: token
                       })

                       console.log("Token output is " + JSON.stringify(jwt.verify(token, app.get('superSecret')), null, 3));
                   }
               }
           });
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    //if not authenticated they will be sent to the home page
    res.redirect('/');
}