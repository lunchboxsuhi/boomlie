angular.module('app').controller('ProfileCtrl', ['$scope', '$http', '$window', '$location', 'FileUploader',
    function ($scope, $http, $window, $location, FileUploader) {

        $scope.ownProfile = true;

        if (typeof $window.sessionStorage.token !== 'undefined') {

            var data = {
                token: $window.sessionStorage.token
            };


            $scope.uploader = new FileUploader(
                {
                    url: '/api2/uploadImage',
                    formData: [
                        {
                            token: $window.sessionStorage.token
                        }
                    ],
                    autoUpload: true,
                    onSuccessItem: function(item, response, status, headers) {
                        console.log(response);
                        $scope.profile.profilePic = response.uploadedImg;
                    }
                });

            $http.post('/api/profile', data)
                .then(function (res) {
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

                    $scope.profile.profileDefaultPicture = typeof $scope.profile.profilePic === 'undefined';
                    $location.path('/profile/newsfeed');
                }, function (err) {
                    console.log('server error');
                    $location.path('/login');
                })
        }

    }]);