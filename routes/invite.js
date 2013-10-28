
/*
 * GET invite listing.
 */

var MiniUser = require('../data/models/MiniUser');

module.exports = function(app){
	app.post('/invite/new', function(req, res, next){
		var user;
		if(req.session.user){
			MiniUser.findOne({_id: req.session.user._id }, function(err, user){
					res.redirect('/invite/' + user._id);
			});
		} else {
			if(req.session._id){
				console.log(1)
				MiniUser.findOne({_id: req.session._id}, function(err, referer){

					if(referer.email == req.body.email){
						res.redirect('/queue/'+ referer._id);

					} else {
						referer.invites.push(req.body.email);
						
						var miniuser;
						miniuser = new MiniUser({ email: req.body.email});
						
						miniuser.save(function(err){
							if(err){

								MiniUser.findOne({email: miniuser.email}, function(err, miniuser){
									res.redirect('/queue/'+ miniuser._id);
								});
							} else {
									req.session.user = miniuser;
									res.redirect('/invite/' + miniuser._id);

								}
							});
						referer.save();
					}
				});
			} else {
				console.log(2)
				var miniuser;
				miniuser = new MiniUser({ email: req.body.email});
				miniuser.save(function(err){
					if(err){
						MiniUser.findOne({email: req.body.email}, function(err, miniuser){
							res.redirect('/queue/'+ miniuser._id);
						});
					} else {
							req.session.user = miniuser;
							res.redirect('/invite/' + miniuser._id);

						}
					});
				}	
			}
		
	});	
	

	app.get('/invite/:id', function(req, res, next){
		var user;
		if(req.session.user){
			user = req.session.user;
		} else {
			user = null;
			req.session._id = req.params.id;
		}
		res.render('invite',{
			title: 'Zefira | Invitaciones',
			user: user,
			session: req.session
		});
		
	});

};