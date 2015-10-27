'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', 'toastrConfig', function ($stateProvider, $urlRouterProvider, toastrConfig) {

    //======================================
    //============ States =================
    //=====================================


    var componentPath = 'app/components/';

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: componentPath + 'home/home.html',
            isLogin: true
        })
        .state('trending', {
            url: '/trending',
            templateUrl: componentPath + 'trending/trending.html',
            isLogin: true
        })
        .state('charts', {
            url: '/charts',
            templateUrl: componentPath + 'charts/charts.html',
            isLogin: true
        })
        .state('genre', {
            url: '/genre',
            templateUrl: componentPath + 'genre/genre.html',
            isLogin: true
        })
        .state('register', {
            url: '/register',
            templateUrl: componentPath + 'register/register.html',
            controller: 'RegisterCtrl',
            isLogin: false,
            isRestricted: true
        })
        .state('profile', {
            url: '/profile',
            templateUrl: componentPath + '/profile/profile.html',
            controller: 'ProfileCtrl',
            isLogin: true
        })
        .state('messages', {
            url: '/mailbox',
            templateUrl: componentPath + '/mailbox/mailbox.html',
            controller: 'MailboxCtrl',
            isLogin: true
        })
        .state('login', {
            url: '/login',
            templateUrl: componentPath + '/login/loginPage.html',
            controller: 'LoginCtrl',
            isLogin: false
        });


    //send to home page if this is not work
    $urlRouterProvider.otherwise('/');


    //config tostr
    angular.extend(toastrConfig, {
        autoDismiss: true,
        positionClass: 'toast-bottom-right',
        maxOpened: 5
    });

}]);