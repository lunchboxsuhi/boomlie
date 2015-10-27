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
                    description: u.description,
                    genre: u.genre,
                    followers: u.followers,
                    following: u.following,
                    profilePic: u.profilePic,
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