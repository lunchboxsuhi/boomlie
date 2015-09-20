'use strict'

angular.module('app').controller('navbarCtrl', ['$scope', function($scope) {

    $scope.formStopPropagation = function(e) {
        e.stopPropagation();
    }

}]);