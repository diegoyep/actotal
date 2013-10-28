
/*
 * GET invite listing.
 */

var MiniUser = require('../data/models/MiniUser');
var shortId = require('shortid');

shortId.seed(2930923);
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
				console.log(req.session._id)
				MiniUser.findOne({_id: req.session._id }, function(err, referer){
					console.log(referer);
					console.log(req.body);
					if(referer.email == req.body.email){
						res.redirect('/queue/'+ referer._id);

					} else {
						referer.invites.push(req.body.email);
						referer.save();
						var miniuser;
						miniuser = new MiniUser({ email: req.body.email, _id : shortId.generate()});
						console.log(miniuser);
						miniuser.save(function(err){
							if(err){
								console.log(err);	
								MiniUser.findOne( {email: req.body.email} , function(err, mu){
									console.log(mu)
									res.redirect('/queue/'+ mu._id);
								});
							} else {
									req.session.user = miniuser;
									res.redirect('/invite/' + miniuser._id);

								}
							});
						
					}
				});
			} else {
				console.log(2)
				var miniuser;
				miniuser = new MiniUser({ email: req.body.email, _id : shortId.generate()});
				miniuser.save(function(err){
					if(err){
						MiniUser.findOne({email: req.body.email,  }, function(err, miniuser){
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
			user: user
			
		});
		
	});

};