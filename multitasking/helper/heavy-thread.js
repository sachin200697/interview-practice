import { parentPort, workerData } from 'worker_threads';

console.log(process.argv);
console.log(process.env);
console.log(workerData);
let i = 0;
while (i < 1000000000) {
	i++;
}

parentPort.postMessage(i);
