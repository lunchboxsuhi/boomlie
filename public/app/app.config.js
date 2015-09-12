'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    //======================================
    //============ States =================
    //=====================================
    $stateProvider
        .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html'
        })
        .state('trending', {
            url: '/trending',
            templateUrl: 'components/trending/trending.html'
        })
        .state('charts', {
            url: '/charts',
            templateUrl: 'components/charts/charts.html'
        })
        .state('genre', {
            url: '/genre',
            templateUrl: 'components/genre/genre.html'
        });


    //send to home page if this is not work
    $urlRouterProvider.otherwise('/');

}]);