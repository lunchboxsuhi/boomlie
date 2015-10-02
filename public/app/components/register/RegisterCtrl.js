angular.module('app').controller('RegisterCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.viewNum = 0;

    $scope.buttons

    $scope.registerPost = function () {
        console.log($scope.registerEmail);
        console.log($scope.registerPassword);

        //send post to api/register with the form information
        var user = {
            //accountType -- do if earlier to check
            firstName: $scope.fanFirstName,
            lastName: $scope.fanLastName,
            password: $scope.fanPassword,
            location: {
                country: $scope.country,
                city: $scope.city
            }
        };

        //send post to get authenticated
        $http.post('/api/signup', user)
            .success(function (res) {
                console.log(res);
            })
            .error(function (res) {
                console.log('Error!');
            });
    };

}]);