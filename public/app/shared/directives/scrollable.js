angular.module('app').directive('scrollable',['$window', function($window) {
    return function(scope, elem, attrs) {
        console.log(elem[0].clientHeight);
    }
}]);
