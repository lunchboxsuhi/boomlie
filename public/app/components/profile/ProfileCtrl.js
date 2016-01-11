angular.module('app').controller('ProfileCtrl', ['$scope', '$http', '$window', '$location', 'FileUploader', 'toastr',
    function ($scope, $http, $window, $location, FileUploader, toastr) {

        //check token to see if it's own profile to allow these funcitons
        $scope.ownProfile = true;       //is this the users current profile ?
        $scope.editMode = false;        //allows user to edit the fields and submit it again
        $scope.profileDetails = true;   //shows in-depth details of the proilfe "expanded view"

        var genreList = function () {
            var list = "";
            for (var i = 0; i < $scope.profile.tags.length; i++) {

                if (i == $scope.profile.tags.length - 1) {
                    list += $scope.profile.tags[i].text;
                }
                else {
                    list += $scope.profile.tags[i].text + ', ';
                }
            }
            return list;
        };

        $scope.changeProfileDetails = function() {
            $scope.profileDetails = !$scope.profileDetails;
        }

        $scope.editModeOn = function () {
            $scope.editMode = true;
        };

        $scope.editModeSave = function () {
            $scope.editMode = false;
            $scope.profile.genre = genreList();
            console.log($scope.profile);
        };


        $scope.editModeCancel = function () {
            $scope.editMode = false;
            $scope.profile.genre = genreList();
            console.log($scope.profile);
        };

        if (typeof $window.sessionStorage.token !== 'undefined') {

            var data = {
                token: $window.sessionStorage.token
            };


            //upload Image click n stuff
            $scope.uploader = new FileUploader(
                {
                    url: '/api2/uploadImage',
                    formData: [
                        {
                            token: $window.sessionStorage.token
                        }
                    ],
                    autoUpload: true,
                    onSuccessItem: function (item, response, status, headers) {
                        console.log(response);
                        $scope.profile.profilePic = response.uploadedImg;
                        toastr.success('Updated Profile Image');
                    }
                });

            $http.post('/api/profile', data)
                .then(function (res) {
                    var u = res.data;

                    $scope.profile = {
                        accountType: u.accountType,
                        firstName: u.firstName,
                        lastName: u.lastName,
                        description: u.description,
                        genre: "R&B, ELECTRO, JAZZ",
                        followers: u.followers,
                        tags: [{text: "R&B"}, {text: "ELECTRO"}, {text: "JAZZ"}],
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