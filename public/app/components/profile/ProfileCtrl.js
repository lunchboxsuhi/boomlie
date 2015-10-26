angular.module('app').controller('ProfileCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {

    if (typeof $window.sessionStorage.token !== 'undefined') {

        var data = {
            token: $window.sessionStorage.token
        };

        $http.post('/api/profile', data)
            .then(function(res) {
                console.log(res.data);

                var u = res.data;

                $scope.profile = {
                    firstName: u.firstName,
                    lastName: u.lastName,
                    imagePath: u.imagePath,
                    location: {
                        country: u.location.country,
                        city: u.location.city
                    }
                };
            },
        function(err) {
            console.log('server error');
        })
    }
}]);