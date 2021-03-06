var azureStorage = require('azure-storage');
var connectMultiparty = require('connect-multiparty');
var multipartMiddleware = connectMultiparty();
var fs = require('fs');
var User = require('../models/user.js');
var express = require('express');


module.exports = function (jwt) {

    var router = express.Router();

    //utilities to be used for middleware on certain routes

    //Models required to be used in api

    router.get('/test', function(req, res) {
       console.log('test');
        res.json({success: true});
    });

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

        console.log(req.body);

        User.findOne({ email: req.body.email }, function(err, data) {
            if (err) throw err;

            if (!data) {
                res.json({success: false, message: 'no user matches e-mail'});
            } else {
                var dbUser = new User();
                if (!dbUser.devPassword(req.body.password, data.password)) {
                    res.json({message: 'emails don\'t match'});
                } else { //make and give them a valid token
                    var jwtModle = {
                        user_id: data._id;
                    }
                    res.json({message: 'user found', data: data});
                }


            }
        });

        /*
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
        */
    });


    /* used for uploading the default avatar image to our server */
    router.get('/uploadFromLocal', function (req, res) {
        var blobService = azureStorage.createBlobService('boomlieimages', 'N+vTMgiekSk8aX0zUXMN21l0fo1pbCepE5DtE7Kz8pNPBmvZDeKL+rIbtCeiBlX/iWD56WHKH3vKpKEfA5KJIA==');

        blobService.createBlockBlobFromLocalFile('imagecontainer', 'avatar', 'tempUpload/Avatar-295x295.jpg', function(error, result, response) {
            if (error) throw error;

            console.log(response);
        });
    });

    //***************************************************
    //**************** Authenticated routes *************
    //***************************************************

    //upload profile picture
    router.post('/api2/uploadImage', multipartMiddleware, function (req, res, next) {

        var path = 'https://boomlieimages.blob.core.windows.net/imagecontainer/';
        var container = 'imagecontainer';

        //create blob service obj
        var blobService = azureStorage.createBlobService('boomlieimages', 'N+vTMgiekSk8aX0zUXMN21l0fo1pbCepE5DtE7Kz8pNPBmvZDeKL+rIbtCeiBlX/iWD56WHKH3vKpKEfA5KJIA==');

        fs.stat(req.files.file.path, function (err, stat) {
            if (err) throw err;

            User.findOne({_id: req.decoded.user_id}, function (err, user) {
                if (err) throw err;

                var timestamp = new Date().getTime();
                var currentUser = user.profilePic;

                // if the user has not uploaded an image yet it will remain empty
                if (user.profilePic != "") {

                    //extract the blobID from the url becuase of Async
                    var urlParse = currentUser.split('/');
                    var blobId = urlParse[urlParse.length - 1];

                    blobService.doesBlobExist(container, blobId, function (err, res) {
                        if (err) throw err;

                        if (res == true) {
                            blobService.startCopyBlob(currentUser, container, blobId, function (err, res) {
                                if (err) throw err;

                                if (res.copyStatus === "success") {
                                    blobService.deleteBlob(container, blobId, function (err, res) {
                                        if (err) throw err;
                                    });
                                }
                            });
                        }
                    });
                } // END findOne

                user.profilePic = path + user._id + timestamp; //update the user
                var readstream = fs.createReadStream(req.files.file.path);

                blobService.createBlockBlobFromStream(
                    container,
                    user._id.toString() + timestamp,
                    readstream,
                    stat.size,
                    {contentType: 'image/jpeg'},
                    function (error, result, response) {

                        if (error) {
                            throw error;
                        }

                        console.log('success in streaming the data up at :' + path);

                        delete req.files;

                        user.save(function (err) {
                            if (err) throw err;
                            console.log('userProfile3: ' + user.profilePic);
                            res.json({success: true, uploadedImg: path + user._id + timestamp})
                        });
                    });
            });
        });
    });

    //update proifle main info
    router.post('/api/updateMainInfo', function(req, res) {

        var user_id = req.decoded;


    });

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
                    accountType: u.accountType,
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
            });
        });
    });

    return router;
};