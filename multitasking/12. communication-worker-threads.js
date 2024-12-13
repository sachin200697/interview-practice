// how to pass data using data buffer and data view
import { MessageChannel, Worker } from 'worker_threads';

const worker = new Worker('./helper/worker-communication-dataview.js');

const dataBuffer = new ArrayBuffer(16); //16 bytes array buffer
const offset = 0;
const noOfElements = 16;

// creating a 8 bit dataView with 16 element
const dataView = new Int8Array(dataBuffer, offset, noOfElements);

// to check if we are transfering the dataView of cloning it
worker.on('message', (msg) => console.log(dataView));

// just to clone
// worker.postMessage(dataView);

worker.postMessage(dataView, [dataView.buffer]);
