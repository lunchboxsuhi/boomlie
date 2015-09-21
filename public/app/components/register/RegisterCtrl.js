angular.module('app').controller('RegisterCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.registerPost = function () {
        console.log($scope.registerEmail);
        console.log($scope.registerPassword);

        //send post to api/register with the form information
        var user = {
            email: $scope.registerEmail,
            password: $scope.password
        };

        //send post to get authenticated
        $http.post('/api/signup', user)
            .success(function (res) {
                console.log(res);
            })
            .error(function (res) {
                console.log('Error!');
            });
    }
}]);