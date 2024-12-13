//difference b/w spawn and exec:
// spawn -> we need to give the option to open shell in window os
// exec -> bydefault it always opens a shell even without mentioning it as options
//  exec does not take agruments we need to pass it in the same first parameter
//  unlike spawn exec will not give data in chunks instead it will have storage
//  and it stores chunks inside it and when all data is ready then it gives response

//spawn: does not has a limit for the data
//exec: it has a buffer to store the data so it will cause issue if it exceedes the size
import { exec } from 'child_process';
import path from 'path';

console.log(process.cwd());

// we can define buffer size as well
// it will help if buffer size exceeded and we want to read large amount of data
// so using this option we can increate the buffer limit
let oneMB = 1024 * 1024;
let fourMB = oneMB * 4;
let listFiles = exec(
	`copy program.js ./new/program1.js`,
	{ maxBuffer: fourMB },
	(error, stdout, stderr) => {
		// if error occurs while executing exec method
		if (error) {
			return console.log('some erro:', error);
		}

		// if error occurs while executing command
		if (stderr) {
			return console.log('std err:', stderr);
		}

		console.log(stdout);
	},
);

//to read the content of program.js
let readFileExec = exec('type program.js', (error, stdout, stderr) => {
	if (error) {
		return console.log('some erro:', error);
	}
	if (stderr) {
		return console.log('std err:', stderr);
	}
	console.log(stdout);
});
