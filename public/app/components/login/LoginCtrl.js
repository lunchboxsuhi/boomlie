angular.module('app').controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {

    //Login Form is clicked
    $scope.login = function() {

        var user = {
            email: $scope.loginEmail,
            password: $scope.loginPassword
        };

        $http.post('/api/login', user)
            .success(function(res) {
                console.log(res);
            })
            .error(function(res) {
                console.log(res);
            });
    }
}]);