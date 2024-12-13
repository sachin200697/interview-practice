import { spawn, exec } from 'child_process';
import { stdout } from 'process';

let execChild = exec(
	'node ./interview1/multitasking/helper/myScript.js',
	(error, stdout, stderr) => {
		if (error) {
			return console.log('some erro:', error);
		}
		if (stderr) {
			return console.log('std err:', stderr);
		}
		console.log('exec method', stdout);
	},
);

let spawnChild = spawn(
	'node',
	['./interview1/multitasking/helper/myScript.js'],
	{
		shell: true,
	},
);
spawnChild.on('error', (error) => console.log(error));
spawnChild.stderr.on('data', (error) => console.log(error));
spawnChild.stdout.on('data', (data) => console.log('spawn method', data));
