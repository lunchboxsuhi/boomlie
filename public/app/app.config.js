'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    //======================================
    //============ States =================
    //=====================================

    var componentPath = 'app/components/';

    $stateProvider
        .state('home', {
        url: '/',
        templateUrl: componentPath + 'home/home.html'
        })
        .state('trending', {
            url: '/trending',
            templateUrl: componentPath + 'trending/trending.html'
        })
        .state('charts', {
            url: '/charts',
            templateUrl: componentPath + 'charts/charts.html'
        })
        .state('genre', {
            url: '/genre',
            templateUrl: componentPath + 'genre/genre.html'
        })
        .state('register', {
            url: '/register',
            templateUrl: componentPath + 'register/register.html',
            controller: 'RegisterCtrl'
        });


    //send to home page if this is not work
    $urlRouterProvider.otherwise('/');

}]);