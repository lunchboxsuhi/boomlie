angular.module('app').directive('scrollable',['$window', function($window) {
    return function(scope, elem, attrs) {
        elem.height = "400px"
        console.log(elem.height);
    }
}]);
