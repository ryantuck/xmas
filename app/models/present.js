// present.js

var mongoose = require('mongoose');

// define the present object
var presentSchema = new mongoose.Schema({
	title: String,
	notes: String,
	link: String,
	index: Number,
	claimedBy: String,
  published: Boolean
});

module.exports = mongoose.model('Present',presentSchema);