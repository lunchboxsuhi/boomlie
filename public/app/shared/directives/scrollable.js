angular.module('app').directive('scrollable',['$window', function($window) {
    return function (scope, element) {
        var w = angular.element($window);
        var changeHeight = function() {element.css('height', ($window.innerHeight - 100) + 'px' );};
        w.bind('resize', function () {
            changeHeight();   // when window size gets changed
        });
        changeHeight(); // when page loads
    }
}]);
