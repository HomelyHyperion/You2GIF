(function () {
	'use strict';

	angular
		.module('you2gif')
		.factory('giflayerService', giflayerService);

	giflayerService.$inject = ['$http', '$log', '$httpParamSerializer', 'GIFLAYER'];

	function giflayerService($http, $log, $httpParamSerializer, GIFLAYER) {
		return {
            convertToGIF: convertToGIF,
            getGIFImageUrl: getGIFImageUrl
		};

		function convertToGIF(url, start, duration) {
		    return $http.get('/api/giflayer', 
		    	{ 
		    		params: { 
		    			'access_key' : GIFLAYER.API_KEY,
						'url' : url,
						'start' : start,
						'duration' : duration
		    		} 
		    	})
                .then(convertToGIFComplete)
                .catch(convertToGIFFailed);

		    function convertToGIFComplete(response) {
		        return response;
		    }

		    function convertToGIFFailed(error) {
		        $log.error('XHR Failed for convertToGIF. ' + error.data);
		    }
		}

		function getGIFImageUrl(url, start, duration) {
			var params = { 
    			'access_key' : GIFLAYER.API_KEY,
				'url' : url,
				'start' : start,
				'duration' : duration
    		}
    		var query = $httpParamSerializer(params);
    		var url = '/api/giflayer/?' + query;
    		
    		return url;
		}
	}

}());