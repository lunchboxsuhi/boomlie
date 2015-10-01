angular.module('app').directive('scrollable',['$window', function($window) {
    return function(scope, elem, attrs) {
        elem.height = $window.innerHeight;
    }
}]);
