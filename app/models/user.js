
// user.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Present = require('./present');

var userSchema = mongoose.Schema({

	local: {
		email : String,
		password : String
	},
	name: String,
	finalized: Boolean,
	presents: [ {type: mongoose.Schema.ObjectId, ref: 'Present'} ]
});

// methods ==========================

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.loadWithDefaultPresents = function() {
	this.finalized = false;

		var p1 = new Present();
		p1.title = 'You!';
		p1.notes = "it's all I want for christmas ;)";
		
		var p2 = new Present();
		p2.title = 'A partridge in a pear tree';
		p2.notes = 'two turtle doves also, if you can swing it.';

		var p3 = new Present();
		p3.title = 'Rudolph the Red Nosed Reindeer & the Island of Misfit Toys';
		p3.notes = 'i know no one has a DVD player any more, but this movie is so great.';
		p3.link = 'http://www.amazon.com/gp/product/B00005NB93/ref=pd_lpo_sbs_dp_ss_3?pf_rd_p=1944579842&pf_rd_s=lpo-top-stripe-1&pf_rd_t=201&pf_rd_i=B00000JZHM&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=093RA2CAQJXFMJ211HDA';

		p1.index = 0;
		p2.index = 1;
		p3.index = 2;

		var prez = [p1,p2,p3];

		for (i=0;i<prez.length;i++){
			this.presents.push(prez[i]._id);
			prez[i].save(function(err){
				if (err)
					console.log(err);
			});
		}
}

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);



