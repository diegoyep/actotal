
var Post = require('../data/models/Post');


module.exports = function(app){
	app.get('/blog', function(req, res, next) {
	var q = Post.find({}).limit(10);
	q.exec(function(err, posts) {
			
			res.render('blog', {
				title: 'Zefira | Blog', 
				posts: posts
			});
		});
	});	
	

	app.get('/blog/show/:slug', function(req, res, next){
		Post.findOne({slug : req.params.slug}, function(err, post){
			console.log(post.author)
			res.render('post', {
				title: 'Zefira | Blog',
				post : post
			});
		});
	});

	
}