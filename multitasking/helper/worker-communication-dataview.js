import { parentPort } from 'worker_threads';

function complexComputation() {
	let i = 0;
	while (i < 1000000000) {
		i++;
	}
	return i;
}

parentPort.on('message', (msg) => {
	console.log(msg);
	parentPort.postMessage('hello');
});
