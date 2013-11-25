
/*
 * GET home page.
 */

 var User = require('../data/models/User');


module.exports= function(app){
	app.get('/', function(req, res, next){
		req.session.destroy();

		User.count({miniuser: true}, function(err, count){
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

	app.get('/team', function(req, res , next){
		res.render('team', {
			title: "Zefira | Team"
		})
	})

	app.get('/info', function(req, res, next){
		res.render('info',{
			title: "Zefira | Informacion"
		})
	})
};