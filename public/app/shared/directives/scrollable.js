angular.module('app').directive('scrollable',['$window', function($window) {
    return function(scope, elem, attrs) {
        elem.height = "40px";
    }
}]);
