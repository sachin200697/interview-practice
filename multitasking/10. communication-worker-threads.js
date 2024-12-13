// Worker and parentPort are the instance of MessagePort class
// for communication two things required => port and channel

import { MessageChannel } from 'worker_threads';

// port1 only can receive message and port2 only can send the message
const { port1: receivingPort, port2: sendingPort } = new MessageChannel();

receivingPort.on('message', (msg) => {
	console.log(msg);
});
receivingPort.on('close', () => {
	console.log('Channel has closed');
});
sendingPort.postMessage('Hello sachin');

// this will do nothing because port1(receivingPort) only can receive message and
// port2(sendingPort) only can send the message
sendingPort.on('message', (msg) => console.log(msg));
receivingPort.postMessage('Port 1');

//for postMessage, we have send agrument -> transferList
// while using portMessage method data will be cloned both sender
// and receiver sides but if we don't want to do that
// then we can pass it inside transferList
// data passed using transferList will be not be available at sender
// side, it will be there only at receiving side once send the message
// but we can not pass anything in transferList
// onething that we can pass is MessagePorts (means port2 or port1)
// why we want to do this: because we have created a channel and
// if we create diff worker threads then we can use same channel
// to communicate b/w these threads

sendingPort.close();
