// fork method creates ipc (inter process communication) b/w
// parent and child process

import { fork } from 'child_process';

//fork will execute child.js file immediately
let childFork = fork('./interview1/multitasking/helper/child.js', [
	'hello',
	1,
	JSON.stringify({ nane: 'sachin' }),
]);

//sending message to child
childFork.send({ message: 'a message from parent process: 5. fork.js' });

//receiving msg
childFork.on('message', (msg) => {
	console.log('A messge from child process:');
	console.log(msg);
});

// listener while child process exit
childFork.on('close', (code) => {
	console.log('Child process exited with code:', code);
});
