import express from 'express';
import connectDB from './dbConnectivity.js';
import Player from './player.js';
import mysqlConnect from './mysqlConnect.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

mysqlConnect();

app.get('/', async (req, res) => {
	try {
		let players = await Player.find();
		res.send(players);
	} catch (error) {
		res.send({ msg: 'Error occured' });
	}
});

app.get('/:id', async (req, res) => {
	let id = req.params.id;
	try {
		let player = await Player.findOne({ _id: id });
		res.send(player);
	} catch (error) {
		res.send({ error: 'some error occured' });
	}
});

app.post('/', async (req, res) => {
	const { name, age, date } = req.body;
	let player = new Player({
		name,
		age,
		date,
	});
	try {
		await player.save();
		res.send({ msg: 'player created' });
	} catch (error) {
		res.status(400).send({ error: 'Some exception occured' });
	}
});

app.delete('/:id', async (req, res) => {
	const id = req.params.id;

	try {
		await Player.findByIdAndDelete(id);
		res.send({ msg: 'player deleted' });
	} catch (error) {
		res.status(400).send({ error: 'Some exception occured' });
	}
});

app.patch('/:id', async (req, res) => {
	const { name, age, date } = req.body;
	const id = req.params.id;
	try {
		const result = await Player.findByIdAndUpdate(
			id,
			{ name, age, date },
			{ returnOriginal: false },
		);
		res.send(result);
	} catch (error) {
		console.log(error);
		res.send({ msg: 'error occured' });
	}
});

app.listen(PORT, () => {
	console.log('running');
});
