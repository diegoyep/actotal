var User = require('../data/models/User');


module.exports = function(app){
	app.get('/queue/:id', function(req, res, next){
		var user;
		var bonus;
		User.findOne({_id:req.params.id } , function(err, user){
			if(user){
				user = user;

				if (user.invites.length == 0) {
					bonus = "S./35";
				} else if (user.invites.length > 3 ) {
					bonus = "S./100";
				} else {
					bonus = "S./75";
				}
				res.render('queue', {
					title: 'Zefira AT | Lista de Espera',
					user : user,
					bonus : bonus
				});

			}
		});
		

	});
};