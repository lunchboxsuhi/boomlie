module.exports = function(router, app, jwt) {


    //Models required to be used
    var User = require('../models/user.js');

    //Main SPA Load
    router.get('/', function(req, res) {
        res.render('index.html');
    });

    //***************************************************
    //**************** Authenticated routes *************
    //***************************************************

    router.get('/api/users', function(req, res) {
        //find users
        User.find({}, 'firstName lastName', function(err, doc) {
            console.log(doc);
            res.json(doc);
        }).skip(50).limit(20).lean();

    });

    //Signup
    router.post('/signup', function(req,res) {
        //grab object to be used
        var user = req.body;

        if (user != null) {

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

            //save the user to the database
            newUser.save(function(err) {
                if (err) throw err;

                console.log("Successfully create user " + user.email);
                res.send(newUser);
            });
        }
    });

    //Login
    router.post('/authenticate', function(req,res) {

        User.findOne({
           email: req.body.email
       }, function(err, user) {
           if (err) throw err;

           if (!user) {
               res.json({ success: false, message: 'Authentication Failed. User Not Found'});
           } else if (user) {
               if(user.password != req.body.password) {
                   res.json({ success: false, message: 'Authentication Failed. Wrong Password'});
               } else {

                   var jwtModel = {
                       user_id: user._id
                   };

                   var token = jwt.sign(jwtModel, app.get('superSecret'), {
                       expireInMinutes: 1440 //expires in 24 hours
                   });

                   res.json({
                       success: true,
                       message: 'Enjoy the Token',
                       token: token
                   });

                   console.log(jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                        console.log("DECODED: " + JSON.stringify(decoded,3));
                   }));
               }
           }
       });
    });

    //isAuthenticated to view this page
    router.post('/api/profile', function(req, res) {

        jwt.verify(req.body.token, app.get('superSecret'), function(err, d) {
            if (err) throw err;



            //get user information from mongod
            User.findOne({_id: d.user_id}, function(err, u) {
                //profile model - we don't want all the fields
                var profile = {
                    firstName: u.firstName,
                    lastName: u.lastName,
                    imagePath: u.imagePath,
                    location: {
                        country: u.location.country,
                        city: u.location.city
                    }
                };

                res.json(profile);
                console.log(u);
            });
        });
    });

    //route middleware
    router.use('/api', function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(token) {
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate'});
                } else {
                    next();
                }
            })
        } else {
            //if there no token gtfo
            return res.status(403).send({
                success: false,
                message: 'No Token Provided'
            });
        }
    });

};