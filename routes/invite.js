
/*
 * GET invite listing.
 */

var MiniUser = require('../data/models/MiniUser');

module.exports = function(app){
	app.post('/invite/new', function(req, res, next){
		var miniuser = new MiniUser( {email: req.body.email});
		miniuser.save(function(err, user){
			if(err){
				MiniUser.findOne({email: req.body.email}, function(err, user){
					if(user){
						res.redirect('/queue/' + user._id);
					}
				});
			} else {
				req.session.user = user;
				res.redirect('/invite/' + user._id);
			}

		});
	});	
	

	app.get('/invite/:id', function(req, res, next){
		var mini ;
		MiniUser.findOne(req.params.id, function(err, user){

			if(user){
				if(user._id == req.session.user._id) {
						mini = user;	
				} else {
					mini = null;
				}
				res.render('invite', {
						title: 'Zefira | Invitaciones',
						user: mini
					});

			}
		});
		
	});

};