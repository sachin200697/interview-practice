// we can create child thread and main thread in the same file

import express from 'express';
import { argv } from 'process';
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

// to get __filename and __dirname
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;

if (isMainThread) {
	// if it is main thread then create server instance and all end-points here
	const app = express();
	app.get('/light', (req, res) => {
		res.send({ msg: 'ligt ok' });
	});

	app.get('/heavy', (req, res) => {
		let childThread = new Worker(__filename);

		childThread.on('message', (data) => {
			res.send({ msg: data });
		});
	});

	app.listen(PORT, () => {
		console.log('listening on port ', PORT);
	});
} else {
	let i = 0;
	while (i < 1000000000) {
		i++;
	}

	parentPort.postMessage({ dataFromChildThread: i });
}
