import { spawn } from 'child_process';

// in window os we can not directly run commands
//  first we need to provide shell
// spawn method gives stream and we can use event listeners to listen to the stream
// spawn can take three args => 1. command,
// 2. array of additional agruments like /b
// 3. optiaons
// let listFiles = spawn('dir', { shell: true });
let listFiles = spawn('dir', ['/b'], { shell: true });

// if getting error while executing spawn method then we can catch it using
// a listener
listFiles.on('error', (err) => {
	console.log(err);
});

//listener on the stream
//create listener to listen to the data chunks
listFiles.stdout.on('data', (data) => {
	console.log(data.toString());
});

//listener on the stream
//create listener to listen to the error
listFiles.stderr.on('data', (error) => {
	console.log(error);
});
