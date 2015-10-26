angular.module('app').factory('authentication', function ($http, $q, $window) {
    var auth = {};

    auth.login = function (credentials) {
        return $http
            .post('/authentication', credentials)
            .then(function (res) {
                $window.sessionStorage.token = res.token;
                console.log('got the token :D');
            }, function () {
                delete $window.sessionStorage.token;
                console.log('error no login');
            });
    };

    //authenticated just checks to see if the token is alive
    auth.isAuthenticated = function () {
        return (typeof $window.sessionStorage.token !== 'undefined');
    };

    return auth;
});

