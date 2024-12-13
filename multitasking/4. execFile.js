// execFile is used to run executable files in separate process
// instead of running the command to shell it will run it by creating a child process
// bydefault execFile run the command in a new process but we can also run it
// inside shell as wall by passing third argument as { shell: true }
import { execFile } from 'child_process';

function fun1() {
	//executables file are mostly present inside program
	let child = execFile('node', ['--version'], (error, stdout, stderr) => {
		if (error) return console.log(error);
		if (stderr) return console.log(stderr);
		console.log(stdout);
	});
}

// fun1();

function fun2() {
	// we can also execute above like this:

	// if we directly use Program Files then it will give error because
	// there is a space in 'Program Files'
	// Yet another solution is to do this: C:\Program Files has a short name
	// C:/Progra~1
	let child = execFile(
		'C:/Progra~1/nodejs/node',
		['--version'],
		// { shell: true },
		(error, stdout, stderr) => {
			if (error) return console.log(error);
			if (stderr) return console.log(stderr);
			console.log(stdout);
		},
	);
}

fun2();
