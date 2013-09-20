
/*
 * GET home page.
 */

exports.index = function(req, res){
	var mongoose = require('mongoose');
	var extend = require('mongoose-schema-extend');
	var Schema = mongoose.Schema;

	mongoose.connect('mongodb://localhost/test');
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', function callback() {

		var PostSchema = new Schema({
			title: String,
			thumbnailImageURL: String,
			fullImageURL: String,
			description: String,
			postDate: Date,
			editDate: Date
		});

		var NoteSchema = PostSchema.extend({
			content: String
		});

		var MediaSchema = PostSchema.extend({
			link: String
		});

		var LabSchema = MediaSchema.extend({});
		var GameSchema = MediaSchema.extend({});
	});

	res.render('index', { title: 'Express' });
};