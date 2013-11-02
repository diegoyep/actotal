
var Post = require('../data/models/Post');


module.exports = function(app){
	app.get('/blog', function(req, res, next) {
	var q = Post.find({}).limit(10);
	q.execFind(function(err, posts) {
		console.log(posts)
		res.render('blog', {
			title: 'Zefira | Blog', 
			posts: posts
		});
	});
		
	}),

	app.get('/blog/show/:slug', function(req, res, next){
		Post.findOne({slug : req.params.slug}, function(err, post){
			res.render('post', {
				title: 'Zefira | Blog',
				post : post
			});
		});
	});
}