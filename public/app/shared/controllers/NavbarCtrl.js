'use strict';

angular.module('app').controller('NavbarCtrl',
    ['$scope', 'authentication', '$window', '$location', 'toastr',
        function ($scope, authentication, $window, $location, toastr) {

    //ng-show needs to be false
    $scope.user = {};
    $scope.user.loggedIn = authentication.isAuthenticated();

    $scope.logout = function () {
        delete $window.sessionStorage.token;
        $location.path('/');
        console.log('loggedout');
        $scope.user.loggedIn = authentication.isAuthenticated();
        toastr.info('Logged out successfully', 'Bye!');
    }
}]);