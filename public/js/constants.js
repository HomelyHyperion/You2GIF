(function() {
    'use strict';

    angular
        .module('you2gif')
        .constant('YOUTUBE', {
        	'API_KEY' : 'AIzaSyAoeNCMhd0JX7RtPG1__QHTWK-Ct9BPY4c',
        	'LIMIT_PER_PAGE' : '50'
        })
        .constant('GIFLAYER', {
            'API_KEY' : '7c0d8aa417c6255d3a17c3ee457099b2'
        });
})();