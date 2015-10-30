//route middleware for authentication
module.exports = function (router, app, jwt) {

    //check to see if there is a token that exists
    router.use('/api', function (req, res, next) {
        var token = req.body.token; //|| req.query.token || req.headers['x-access-token'];

        //checks to see if there is token that exists
        if (token) {
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate'});
                } else {
                    next(); //only run this if we need to continue to the next route.
                }
            })
        } else {
            //if there no token gtfo
            return res.status(403).send({
                authenticated: false,
                message: 'No Token Provided'
            });
        }
    });
};