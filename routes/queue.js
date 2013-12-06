var User = require('../data/models/User');


module.exports = function(app){
	app.get('/queue/:id', function(req, res, next){
		var user;
		var bonus;
		User.findOne({_id:req.params.id } , function(err, user){
			if(user){
				user = user;

				if (user.invites.length == 0) {
					bonus = "35  puntos";
				} else if (user.invites.length > 3 ) {
					bonus = "100 puntos ";
				} else {
					bonus = "75 puntos";
				}
				res.render('queue', {
					title: 'Zéfira AT | Lista de Espera',
					user : user,
					bonus : bonus
				});

			}
		});
		

	});
};