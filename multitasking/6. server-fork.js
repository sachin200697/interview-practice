import express from 'express';
import { fork } from 'child_process';

const app = express();

app.get('/light', (req, res) => {
	res.send({ msg: 'ligt ok' });
});

app.get('/heavy-blocking', (req, res) => {
	let i = 0;
	while (i < 10000000000) {
		i++;
	}
	res.send({ msg: 'heavy completed' });
});

app.get('/heavy-non-blocking', (req, res) => {
	//C:\Users\HP 14-dh1026TX\Desktop\Interview\interview1\multitasking
	// console.log('cwd is like', process.cwd());
	const child = fork('./helper/heavy-child.js');
	child.send('start');
	child.on('message', (msg) => {
		res.send({ msg: msg.count });
	});
});

app.listen(3000, () => {
	console.log('listening on port 3000');
});
