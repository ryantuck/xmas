
// user.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Present = require('./present');

var userSchema = mongoose.Schema({

	local: {
		email : String,
		password : String
	},
	finalized: Boolean,
	presents: [ {type: mongoose.Schema.ObjectId, ref: 'Present'} ]
});

userSchema.pre('save',function(next){

	console.log('user constructor');

	// if user has no presents (happens when user is first constructed), populate with default presents
	if (this.presents.length === 0) {

		this.finalized = false;


		var p1 = new Present();
		var p2 = new Present();
		var p3 = new Present();
		var p4 = new Present();
		var p5 = new Present();


		p1.title = 'Underwear!';
		p2.title = 'coffee joulies';
		p3.title = 'The Art of Computer Programming';
		p4.title = 'Victorinox chef knife';
		p5.title = 'dinner out at Ippudo';

		p1.notes = 'only hanes, only polyblend';
		p3.notes = 'Donald Knuth. Apparently pretty rad for CS-types.';
		p4.notes = 'Chefs Illustrated said this is the best bang-for-buck knife out there';
		p5.notes = 'NYC. Midtown West. please please please please.';

		p2.link = 'http://www.joulies.com/products/5-pack#';
		p3.link = 'http://www.amazon.com/Computer-Programming-Volumes-1-4A-Boxed/dp/0321751043/ref=pd_sim_b_2?ie=UTF8&refRID=0HEFJJQ74YD4F0HJTV9X';

		p1.index = 0;
		p2.index = 1;
		p3.index = 2;
		p4.index = 3;
		p5.index = 4;

		

		var prez = [p1,p2,p3,p4,p5];

		for (i=0;i<prez.length;i++){
			this.presents.push(prez[i]._id);
			prez[i].save(function(err){
				if (err)
					console.log(err);
			});
		}
	}



	next();

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

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);



