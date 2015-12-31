var express = require('express');
var request = require('request');
var querystring = require('querystring');
var app = express();

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

/**
 * Configure API routes.
 */
app.get('/api/giflayer', function (req, res, next) {
  	var query = querystring.stringify({ 
  		'access_key': req.query.access_key, 
  		'url': req.query.url,
  		'start': req.query.start,
  		'duration': req.query.duration
  	});
   	
   	var url = 'http://apilayer.net/api/capture?' + query;
  	request.get(url, function(error, response, body) {
  		if (error) {
	      return next(error);
	    }
	    
		res.status(response.statusCode);
  		res.set(response.headers);

      if(req.query.download) {
        res.setHeader('Content-disposition', 'attachment; filename=download.gif');
      }

  		request(url).pipe(res);
  	});
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
	console.log('server listening on port ' + app.get('port'));
});