'use strict';

angular.module('app').controller('MainCtrl', ['$scope', '$activityIndicator', function($scope, $activityIndicator) {

    $activityIndicator.startAnimating();
    $timeout(function() {
        $activityIndicator.stopAnimating();
    });
}]);