module.exports = function (router, app, jwt) {


    //Models required to be used in api
    var User = require('../models/user.js');

    //**************************************************
    //************ UnAthenticated Routes ***************
    //**************************************************

    //Signup
    router.post('/signup', function (req, res) {
        //grab object to be used
        var user = req.body;

        if (user != null) {

            var newUser = new User({
                //accountType: user.firstName,
                accountType: user.accountType,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                created_at: new Date(),
                updated_at: new Date(),
                followers: 0,
                following: 0,
                DOB: user.DOB,
                location: {
                    country: user.location.country,
                    city: user.location.city
                }
            });

            //add the property password with a hashed value
            newUser.password = newUser.generateHash(user.password);

            //save the user to the database
            newUser.save(function (err) {
                if (err) throw err;

                console.log("Successfully create user " + user.email);
                res.send(newUser);
            });
        }
    });


    router.post('/authenticate', function (req, res) {

        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Authentication Failed. User Not Found'});
            } else if (user) {

                var dbUser = new User();

                if (!dbUser.validPassword(req.body.password, user.password)) {
                    res.json({success: false, message: 'Authentication Failed. Wrong Password'});
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

                    console.log(jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                        console.log("DECODED: " + JSON.stringify(decoded, 3));
                    }));
                }
            }
        });
    });


    //***************************************************
    //**************** Authenticated routes *************
    //***************************************************

    //get a list of 20 users
    router.get('/api/users', function (req, res) {
        //find users
        User.find({}, 'firstName lastName', function (err, doc) {
            console.log(doc);
            res.json(doc);
        }).skip(50).limit(20).lean();
    });


    //the current users profile
    router.post('/api/profile', function (req, res) {

        jwt.verify(req.body.token, app.get('superSecret'), function (err, d) {
            if (err) throw err;


            //get user information from mongod
            User.findOne({_id: d.user_id}, function (err, u) {
                //profile model - we don't want all the fields
                var profile = {
                    firstName: u.firstName,
                    lastName: u.lastName,
                    description: u.description,
                    genre: u.genre,
                    following: u.following,
                    followers: u.followers,
                    profilePic: u.profilePic,
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
};