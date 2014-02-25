/*
 * GET home page.
 */

// The home page
exports.index = function(req, res){
/*
	var mongoose = require('mongoose');
	var extend = require('mongoose-schema-extend');
	var Schema = mongoose.Schema;

	mongoose.connect('mongodb://localhost/granttimmerman');
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', function callback() {

		var POST_TYPES = {
			'note': 'note',
			'lab': 'lab',
			'game': 'game'
		};

		// Schemas
		var PostSchema = new Schema({
			title: String,
			thumbnailImageURL: String,
			fullImageURL: String,
			body: String,
			postDate: Date,
			editDate: Date,
			type: String,
			views: Number
		});

		var NotePostSchema = PostSchema.extend({
			content: String
		});

		var MediaPostSchema = PostSchema.extend({
			link: String
		});

		var LabPostSchema = MediaSchema.extend({});
		var GamePostSchema = MediaSchema.extend({});

		// Models
		var Post = mongoose.model('Post', PostSchema);
		var NotePost = mongoose.model('NotePost', NoteSchema);
		var MediaPost = mongoose.model('MediaPost', MediaSchema);
		var LabPost = mongoose.model('LabPost', LabSchema);
		var GamePost = mongoose.model('GamePost', GameSchema);

		function find (collec, query, callback) {
			db.collection(collec, function (err, collection) {
				collection.find(query).toArray(callback);
			});
		}

		// find('Post', {title: 'Fresh. Start.'}, function (err, docs) {
		// 	console.log(docs);
		// });

		// Collection

		var note = {
			title: 'Fresh. Start.',
			body: '<p>Hello.</p><p>With the beginning of a new school year, I have revamped my portfolio website with a new clean look and feel. Enjoy.</p>'
		};

		// First model
		var firstPost = new NotePost({
			title: 'Fresh. Start.',
			body: 'I created a new website.'
		});

		firstPost.save(function (err, post) {
			if (err) return console.error(err);
			console.dir(post);
		});

		Note.find({}, function (err, post) {
			console.log(post);
		});
	});
	*/
	var indexParams = {
		title: 'Grant Timmerman',
		card: {
			github: {
				api: {}
			}
		}
	};
	res.render('index', indexParams);
};

exports.vidwall = function (req, res) {
	res.render('vidwall');
};

exports.cardAPI = function (req, res) {
	var id = req.params.id;
	res.render('partials/cards/data/' + id + '/open');
};