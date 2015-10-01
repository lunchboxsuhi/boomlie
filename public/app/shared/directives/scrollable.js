angular.module('app').directive('scrollable', function() {
    return function(scope, elem, attrs) {
        elem.height( $(window).height() - $('.navbar').outerHeight() );
    }

})
