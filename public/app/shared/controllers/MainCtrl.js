'use strict';

angular.module('app').controller('MainCtrl',
    ['$scope', '$activityIndicator', '$timeout', 'authentication', 'toastr', '$rootScope',
        function($scope, $activityIndicator, $timeout, authentication, toastr, $rootScope) {
            //create account
            $scope.account = {
                loggedIn: authentication.isAuthenticated()
            };

}]);
