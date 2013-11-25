var User = require('../data/models/User');


module.exports = function(app){
	app.get('/queue/:id', function(req, res, next){
		var user;
		User.findOne({_id:req.params.id } , function(err, user){
			if(user){
				user = user;
				res.render('queue', {
					title: 'Zefira | Lista de Espera',
					user : user
				});

			}
		});
		

	});
};