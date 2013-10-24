
/*
 * GET home page.
 */

module.exports= function(app){
	app.get('/', function(req, res, next){
		res.render('index', { title: 'Zefira | Acceso Total' });
	});

	app.get('/terms' ,function(req, res, next){
		res.render('terms', {title:'Zefira | Terminos y Servicios '});
	});

	app.get('/faq', function(req, res, next){
		res.render('faq', {title: 'Zefira | Preguntas mas Frecuentes'});
	});
};