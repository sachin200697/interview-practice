import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	age: {
		type: Number,
	},
	date: {
		type: Date,
		default: new Date(),
	},
});

const Player = mongoose.model('player', schema);
export default Player;
