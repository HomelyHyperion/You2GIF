(function () {
	'use strict';

	angular
		.module('you2gif')
		.factory('youtubeService', youtubeService);

	youtubeService.$inject = ['$http', '$log', 'YOUTUBE'];

	function youtubeService($http, $log, YOUTUBE) {
		return {
            searchVideos: searchVideos
		};

		function searchVideos(keyword, nextPageToken) {
		    return $http.get('https://www.googleapis.com/youtube/v3/search', 
		    	{ 
		    		params: { 
		    			'key' : YOUTUBE.API_KEY,
		    			'maxResults' : YOUTUBE.LIMIT_PER_PAGE,
		    			'q' : keyword,
		    			'pageToken' : nextPageToken,
		    			'part' : 'snippet',
		    			'type' : 'video'
		    		} 
		    	})
                .then(searchVideosComplete)
                .catch(searchVideosFailed);

		    function searchVideosComplete(response) {
		        return response.data;
		    }

		    function searchVideosFailed(error) {
		        $log.error('XHR Failed for searchVideos. ' + error.data);
		    }
		}
	}

}());