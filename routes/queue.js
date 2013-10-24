var MiniUser = require('../data/models/MiniUser');


module.exports = function(app){
	app.get('/queue/:id', function(req, res, next){
		var User;
		MiniUser.findOne({_id:req.params.id } , function(err, user){
			if(user){
				User = user;
				res.render('queue', {
					title: 'Zefira | Lista de Espera',
					user : User
				});

			}
		});
		

	});
};