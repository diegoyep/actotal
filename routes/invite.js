
/*
 * GET invite listing.
 */

var User = require('../data/models/User');
var shortId = require('shortid');
var Partner = require('../data/models/Partner');
shortId.seed(2930923);


module.exports = function(app){
	app.post('/invite/new', function(req, res, next){
		var user;
		if(req.session.user){
			User.findOne({_id: req.session.user._id }, function(err, user){
					res.redirect('/invite/' + user._id);
			});
		} else {

			if(req.session.ref) {
				Partner.findOne({_id: req.session._id}, function(err, referer){
					console.log(referer);
					if(referer.email == req.body.email) {
						res.send('401');
					} else {
						referer.waitlist.push(req.body.email);
						referer.save();
						var user;
						user = new User({ 
							email: req.body.email, 
							_id : shortId.generate(),
							miniuser: true,
							full_user : false,
							username: req.body.email
							});
						
						user.save(function(err){
							if(err){
									
								User.findOne( {email: req.body.email} , function(err, mu){
									
									res.redirect('/queue/'+ mu._id);
								});
							} else {
									req.session.user = user;
									res.redirect('/invite/' + user._id);

								}
							});
						
					}
				});
			}
			 else if(req.session._id){
				
				User.findOne({_id: req.session._id }, function(err, referer){
					
					if(referer.email == req.body.email){
						res.redirect('/queue/'+ referer._id);


					} else {
						referer.invites.push(req.body.email);
						referer.save();
						var user;
						user = new User({ 
							email: req.body.email, 
							_id : shortId.generate(),
							miniuser: true,
							full_user : false,
							username: req.body.email
							});
						
						user.save(function(err){
							if(err){
									
								User.findOne( {email: req.body.email} , function(err, mu){
									
									res.redirect('/queue/'+ mu._id);
								});
							} else {
									req.session.user = user;
									res.redirect('/invite/' + user._id);

								}
							});
						
					}
				});
			} else {
				
				var user;
				user = new User({ 
					email: req.body.email, 
					_id : shortId.generate(),
					miniuser: true,
					full_user : false,
					username: req.body.email
				});
				user.save(function(err){
					if(err){
						User.findOne({email: req.body.email,  }, function(err, user){
							res.redirect('/queue/'+ user._id);
						});
					} else {
							req.session.user = user;
							res.redirect('/invite/' + user._id);

						}
					});
				}	
			}
		
	});	
	

	app.get('/invite/:id', function(req, res, next){
		var user;
		if(req.query.ref){
			req.session.ref = req.query.ref;
			user = null;
			req.session._id = req.params.id;
		} else if (req.session.user){
			user = req.session.user;
		} else {
			user = null;
			req.session._id = req.params.id;
		}
		res.render('invite',{
			title: 'Zéfira AT | Invitaciones',
			user: user,
			
		});
		
	});

};