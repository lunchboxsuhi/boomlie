'use strict';

angular.module('app').controller('NavbarCtrl',
    ['$scope', 'authentication', '$window', '$location', 'toastr',
        function ($scope, authentication, $window, $location, toastr) {

    //used for mobile bootstrap
    $scope.isCollapsed = true;

    //ng-show needs to be false
    $scope.user = {};
    $scope.user.loggedIn = authentication.isAuthenticated();

    $scope.logout = function () {
        delete $window.sessionStorage.token;
        $location.path('/login');
        console.log('loggedout');
        $scope.user.loggedIn = authentication.isAuthenticated();
        $scope.account.loggedIn = authentication.isAuthenticated();
        toastr.success('Logged out successfully', 'Bye!', {iconClass:'toastr-logout toast-success'});
    }
}]);