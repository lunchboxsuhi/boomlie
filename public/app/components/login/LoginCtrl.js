angular.module('app').controller('LoginCtrl', ['$scope', '$http', '$window', 'authentication', function ($scope, $http, $window, authentication ) {


    console.log(authentication.isAuthenticated());

    //Login Form is clicked
    $scope.loginForm = function () {

        var user = {
            email: $scope.loginUser.email,
            password: $scope.loginUser.password
        };

        console.log(user);

        $http.post('/authenticate', user)
            .success(function (res) {
                if (res.token) {
                    //set the token that is recieved and hide the login form
                    $window.sessionStorage.token = res.token;
                    $scope.user.loggedIn = authentication.isAuthenticated();

                    //resset the form
                    $scope.login.$setPristine();
                    $scope.login.$setUntouched();
                    $scope.loginUser = {};
                }

            })
            .error(function (res) {
                delete $window.sessionStorage.token;
                console.log('error no login');
            });
    };




}]);