module.exports = function(app, passport) {

    app.get('/', function(req, res) {
       res.render('index.html');
    });

    app.post('/api/signup', passport.authenticate('local-signup'), function(req, res) {
        res.send(req.user);
    });

    app.post('/api/testRequest', function(req, res) {
        res.send('hit test');
    });

    // Logout
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect();
    });
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    //if not authenticated they will be sent to the home page
    res.redirect('/');
}