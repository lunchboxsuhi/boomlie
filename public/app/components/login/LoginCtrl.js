angular.module('app').controller('LoginCtrl', ['$scope', '$http', '$window',  function($scope, $http, $window) {

    //Login Form is clicked
    $scope.loginForm = function() {

        var user = {
            email: $scope.login.email,
            password: $scope.login.password
        };

        console.log(user);

        $http.post('/api/authenticate', user)
            .success(function(res) {
                $window.sessionStorage.token = res.token;
                console.log(res.token);
            })
            .error(function(res) {
                delete $window.sessionStorage.token;
                console.log('error no login');
            });
    }

}]);