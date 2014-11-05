// present.js

var mongoose = require('mongoose');

// define the present object
var presentSchema = new Schema({
	title: String,
	priority: int
});

module.exports = mongoose.model('Present',presentSchema);