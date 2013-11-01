
var Post = require('../data/models/Post');


module.exports = function(app){
	app.get('/blog', function(req, res, next) {
	var q = Post.find({}).sort('date', -1).limit(10);
	q.execFind(function(err, posts) {
		res.render('blog', {
			title: 'Zefira | Blog', 
			posts: posts
		});
	});
		
	}),

	app.get('/blog/:slug', function(req, res, next){
		Posts.findOne({slug : req.params.slug}, function(err, post){
			res.render('post', {
				title: 'Zefira | Blog',
				post : post
			});
		});
	});
}