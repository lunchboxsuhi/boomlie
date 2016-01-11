'use strict';

angular.module('app', ['ui.router', 'ui.bootstrap', 'mgo-angular-wizard', 'ngActivityIndicator', 'ngAnimate', 'toastr', 'angularFileUpload', 'ngTagsInput'])
    .run(['$rootScope', 'toastr', 'authentication', '$location', function ($rootScope, toastr, authentication, $location) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            var userAuthenticated = authentication.isAuthenticated();
            /* Check if the user is logged in */

            if (!userAuthenticated && next.isLogin) {
                /* You can save the user's location to take him back to the same page after he has logged-in */
                $rootScope.savedLocation = $location.url();

                $location.path('/login');
                //toastr.error('Unauthorized!', 'please log in');
            } else if (userAuthenticated && next.isRestricted) {
                $location.path('/');
                toastr.error('Cannot perform this action while logged in');
            }
        });

    }]);


