const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

// Lot Schema
const lotSchema = mongoose.Schema({
	_id: {
		type: ObjectId,
		required: true
	},
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
	user: {
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

let Lot = module.exports = mongoose.model('Lot', lotSchema);