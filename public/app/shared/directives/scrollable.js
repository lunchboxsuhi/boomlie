angular.module('app').directive('scrollable',['$window', function() {
    return function(scope, elem, attrs) {
        elem.height = $window.innerHeight;
    }
}]);
