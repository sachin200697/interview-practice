// creating a process is costly, so we can use multithreading instead of multiprocessing
// if we create a new thread then it has its
// own js engine instance, node instance and own event loop
// unlike child processes because threads are part of same process
// so they get same shared memory

import express from 'express';
import { argv } from 'process';
import { Worker, workerData } from 'worker_threads';
const PORT = 3000;

const app = express();

app.get('/light', (req, res) => {
	res.send({ msg: 'ligt ok' });
});

app.get('/heavy', (req, res) => {
	let options = {
		argv: [1, 2, 3], //need to use process argv
		env: { var1: 10, var2: 20 }, // diff thread can have diff env variables
		// env are cloned so parent and worker thread can have separate copies of it
		workerData: { numberOfThreads: 2 }, // we can access it in thread using workerData
	};
	let childThread = new Worker('./helper/heavy-thread.js', options);

	childThread.on('message', (data) => {
		res.send({ msg: data });
	});

	childThread.on('exit', () => {
		console.log('Thread is exiting');
	});

	childThread.on('error', (err) => {
		console.log(err);
	});

	childThread.on('online', () => {
		console.log('worker thread is online now');
	});
});

app.listen(PORT, () => {
	console.log('listening on port ', PORT);
});
