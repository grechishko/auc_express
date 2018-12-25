const mongoose = require('mongoose');

const lotSchema = mongoose.Schema({
	name: {
		type: String, 
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	auctioner: {
		type: String
	},
	date: {
		type: String
	},
	duration: {
		type: String
	},
	last_bidder: {
		type: String
	},
	images_urls: {
		type: [String]
	}	
	// rating: {
	// 	type: Number, 
	// 	// "default": 0, 
	// 	// min: 0, 
	// 	// max: 1 
	// }
});

module.exports = mongoose.model('Lot', lotSchema);