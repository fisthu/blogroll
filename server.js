var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogroll');

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	author: String,
	title: String,
	url: String
});

mongoose.model('Blog', BlogSchema);

var Blog = mongoose.model('Blog');

// var blog = new Blog({
// 	author: 'fisthu',
// 	title: 'test',
// 	url: 'google.com'
// });
// blog.save();

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// ROUTES
app.get('/api/blogs', function(req, res) {
	Blog.find(function(err, docs) {
		docs.forEach(function(item) {
			console.log('Received a GET request for _id: ' + item._id);
		});
		res.send(docs);
	});
});

app.post('/api/blogs', function(req, res) {
	console.log('Received POST request: '+ JSON.stringify(req.body));
	var blog = new Blog(req.body);
	blog.save(function(err, docs) {
		res.send(docs);
	});
});

app.delete('/api/blogs/:id', function(req, res) {
	console.log('Received DELETE request for _id: ' + req.params.id);
	Blog.remove({_id: req.params.id}, function(err) {
		res.send({_id: req.params.id});
	});
});

app.put('/api/blogs/:id', function(req, res) {
	console.log('Received PUT request for _id: ' + req.params.id);
	Blog.update({_id: req.params.id}, req.body, function(err) {
		res.send({_id: req.params.id});
	});
});

var port = 3000;

app.listen(port);
console.log('server on ' + port);