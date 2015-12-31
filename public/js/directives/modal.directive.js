(function () {
    'use strict';

    angular
		.module('you2gif')
		.directive('modal', modal);

    function modal() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'js/directives/modal.directive.html',
            scope: {},
            controller: ModalController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }
    
    ModalController.$inject = ['$http', '$interval', '$timeout', 'giflayerService'];

    function ModalController($http, $interval, $timeout, giflayerService) {
        var vm = this;
        vm.player = {};
        vm.stopInterval = null;
        vm.videoId = '';
        vm.startTime = 0;
        vm.currentTime = 0;
        vm.duration = '5';
        vm.range = new Array(10);
        vm.ImageUrl = '';
        vm.loading = true;
        vm.clearModal = clearModal;
        vm.resetVideo = resetVideo;
        vm.convertVideoToGIF = convertVideoToGIF;

        activate();

        function activate() {
            initYoutubePlayer();
            onModalOpen();
            onModalClose();
            onImageLoaded();
        }

        function onModalOpen() {
            $('#modal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget) 
                vm.videoId = button.data('id')
                vm.player.loadVideoById(vm.videoId);
                vm.loading = true;
            });
        }

        function onModalClose() {
            $('#modal').on('hidden.bs.modal', function (e) {
                vm.clearModal();
            });
        }

        function onImageLoaded() {
            $('.gif-wrapper img').bind('load', function() {
                vm.loading = false;
            });
        }

        function initYoutubePlayer() {
            vm.player = new YT.Player('player', 
            {
                height: '390',
                width: '640',
                playerVars: {rel: 0},
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });

            function onPlayerReady(event) {
                event.target.playVideo();

                $interval(function() {
                    vm.currentTime = Math.ceil(vm.player.getCurrentTime());
                }, 1000)
            }
            
            function onPlayerStateChange(event) {
                $interval.cancel(vm.stopInterval);

                if (event.data == YT.PlayerState.PLAYING) {
                    vm.startTime = Math.floor(vm.player.getCurrentTime());
                    vm.stopInterval = $interval(vm.resetVideo, vm.duration * 1000);
                }

                if(event.data == YT.PlayerState.ENDED) {
                    vm.resetVideo();
                }
            }
        }

        function clearModal() {
            vm.imageUrl = '';
            vm.player.stopVideo();
        }

        function resetVideo() {
            vm.player.seekTo(vm.startTime);
        }

        function convertVideoToGIF() {
            var url = 'https://www.youtube.com/watch?v=' + vm.videoId;
            vm.clearModal();
            vm.imageUrl = giflayerService.getGIFImageUrl(url, vm.startTime, vm.duration);
        }
    }

}());
