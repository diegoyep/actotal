
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');
var dbURL = 'mongodb://zefira-admin:finalf@ds043368.mongolab.com:43368/zefira-dev';
var db = require('mongoose').connect(dbURL);

var app = express();

// all environments
app.use(express.compress());
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser("mysecretstring"));

app.use(express.session({
	secret: 'mysecretstring',
		maxAge: 36000000
		}));

app.use(function(req, res, next){
  res.locals.session = req.session ;
   next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

require('./routes/index')(app);
require('./routes/invite')(app);
require('./routes/queue')(app);
require('./routes/blog')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
