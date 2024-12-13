// npm i workerpool
// a module to handle multitasking or multiprocessing

import express from 'express';
import workerpool from 'workerpool';
const PORT = 3000;

function heavyComputation() {
	let i = 0;
	while (i < 1000000000) {
		i++;
	}
	return i;
}

const app = express();

// in pool method we can pass a file path like Worker and
// secnod agrument is options object
const pool = workerpool.pool();

app.get('/light', (req, res) => {
	res.send({ msg: 'ligt ok' });
});

app.get('/heavy', (req, res) => {
	pool
		.exec(heavyComputation)
		.then((data) => {
			res.send({ data });
		})
		.catch((err) => console.log(err))
		.then(() => {
			pool.terminate();
		});
});

app.listen(PORT, () => {
	console.log('listening on port ', PORT);
});
