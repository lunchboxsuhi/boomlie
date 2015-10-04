angular.module('app').controller('RegisterCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.viewNum = 0;
    console.log('loaded register ctrl');

    $scope.accountCredentials = function() {
        console.log($scope.fan.email);
       // console.log($scope.fan.firstName);
    };

    $scope.registerUser = function() {

        var newUser = {
            email: $scope.fan.email,
            password: $scope.fan.password,
            firstName: $scope.fan.firstName,
            lastName: $scope.fan.lastName,
            DOB: $scope.dt,
            location: {
                country: $scope.fan.country,
                city: $scope.fan.city
            }
        };

        //send post to get authenticated
        $http.post('/api/signup', newUser)
            .success(function (res) {
                console.log(res);
            })
            .error(function (res) {
                console.log('Error!');
            });
    };
}]);