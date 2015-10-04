angular.module('app').controller('RegisterCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.viewNum = 0;
    var accType = "Fan";

    //submit register form for for
    $scope.registerUser = function () {

        if ($scope.viewNum == 1) accType = "Fan";
        if ($scope.viewNum == 2) accType = "Artist";
        if ($scope.viewNum == 3) accType = "Group";

        var newUser = {
            accountType: accType,
            email: $scope.fan.email,
            password: $scope.fan.password,
            firstName: $scope.fan.firstName,
            lastName: $scope.fan.lastName,
            DOB: $scope.fan.dt,
            location: {
                country: $scope.fan.location.country,
                city: $scope.fan.location.city
            }
        };
        console.log(newUser);

        //send post to get authenticated
        $http.post('/api/signup', newUser)
            .success(function (res) {
                console.log("success register user" + res);
                console.log("YYAYYYAYAYAYA");
            })
            .error(function (res) {
                console.log('Error! - Unable to register User');
            });
    };
}]);