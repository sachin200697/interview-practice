import { MessageChannel, Worker } from 'worker_threads';

const worker = new Worker('./helper/worker-communication.js');
const { port1: receivingPort, port2: sendingPort } = new MessageChannel();

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
// we can also pass array buffers inside transferList

// it will only clone the sendingPort but will not transfer it
// so below line will give error:
// TypeError: Object that needs transfer was found in message but
//  not listed in transferList
// to solve this error we need to use transferList as second agrument
// worker.postMessage({ sendingPort });
worker.postMessage({ sendingPort }, [sendingPort]);

receivingPort.on('message', (msg) => console.log(msg));

sendingPort.close();
