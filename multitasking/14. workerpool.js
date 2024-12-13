// how to use files to create a worker

import express from 'express';
import workerpool from 'workerpool';

const PORT = 3000;
const app = express();

// in pool method we can pass a file path like Worker and
// secnod agrument is options object
const pool = workerpool.pool('./helper/workerpool-thread.js');

app.get('/light', (req, res) => {
	res.send({ msg: 'ligt ok' });
});

app.get('/heavy', (req, res) => {
	console.log(pool.stats()); //to check worker info
	//pool.exec takes three args (last to optoinal)
	// second agrument is an array of arguments to the
	// function passed as first agrument of exec method
	// third arg is options object like to listen to events
	pool
		.exec('heavyComputation', [], {
			on: (msg) => console.log(msg),
		}) //need to make function name as string as it is present in different file
		.then((data) => {
			res.send({ data });
			console.log(pool.stats());
		})
		.catch((err) => console.log(err))
		.then(() => {
			pool.terminate();
		});
});

app.listen(PORT, () => {
	console.log('listening on port ', PORT);
});
