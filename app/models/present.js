// present.js

var mongoose = require('mongoose');

// define the present object
var presentSchema = new mongoose.Schema({
	title: String,
	notes: String,
	link: String
});

module.exports = mongoose.model('Present',presentSchema);