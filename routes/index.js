
/*
 * GET home page.
 */

 var MiniUser = require('../data/models/MiniUser');


module.exports= function(app){
	app.get('/', function(req, res, next){
		req.session.destroy();
		

		MiniUser.count(function(err, count){
			res.render('index', { 
				title: 'Zefira | Acceso Total',
				count: count 
				
			});
		});
	});

	app.get('/terms' ,function(req, res, next){
		res.render('terms', {title:'Zefira | Terminos y Servicios '});
	});

	app.get('/faq', function(req, res, next){
		res.render('faq', {title: 'Zefira | Preguntas mas Frecuentes'});
	});
};