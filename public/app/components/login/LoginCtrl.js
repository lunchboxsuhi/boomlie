angular.module('app').controller('LoginCtrl', ['$scope', function($scope) {

    //Login Form is clicked
    $scope.login = function() {
        console.log($scope.loginEmail);
        console.log($scope.loginPassword);
    }
}]);