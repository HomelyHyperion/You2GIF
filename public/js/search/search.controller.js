(function () {
    'use strict';

    angular
		.module('you2gif')
		.controller('SearchController', SearchController);

    SearchController.$inject = ['youtubeService'];

    function SearchController(youtubeService) {
        var vm = this;
        vm.keyword = '';
        vm.nextPageToken = '';
        vm.videos = [];
        vm.loadingResults = true;
        vm.searchVideos = searchVideos;
        vm.loadMoreVideos = loadMoreVideos;

        activate();

        function activate() {
            vm.searchVideos(vm.keyword);
        }

        function searchVideos(keyword) {
            vm.videos = [];
            vm.loadingResults = true;

            return youtubeService.searchVideos(keyword).then(function (response) {
                vm.loadingResults = false;
                vm.nextPageToken = response.nextPageToken;
                vm.videos = response.items;
                return vm.videos;
            });
        }

        function loadMoreVideos() {
            return youtubeService.searchVideos(vm.keyword, vm.nextPageToken).then(function (response) {
                vm.nextPageToken = response.nextPageToken;
                Array.prototype.push.apply(vm.videos, response.items);
                return vm.videos;
            });
        }
    }

}());