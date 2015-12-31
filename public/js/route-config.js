(function () {
    'use strict';

    angular
        .module('you2gif')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'js/search/search.html',
                controller: 'SearchController as vm'
            });
    }

}());