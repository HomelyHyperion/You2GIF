(function () {
    'use strict';

    angular
		.module('you2gif')
		.directive('loader', loader);

    function loader() {
        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'js/directives/loader.directive.html',
            scope: {
                loading: '='
            }
        };

        return directive;
    }

}());
