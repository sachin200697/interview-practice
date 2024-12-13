// As js is single threaded so it can use only single core of
// CPU( event CPU has 8 cores or more)
// so to run the child process or worker threads on other core of CPU,
// cluster help to achieve it

import cluster from 'cluster';
import express from 'express';
import os from 'os';
const PORT = 3000;

if (cluster.isPrimary) {
	//execute if process is parent or main process

	//get how many cores are there in CPU
	// because it is good practice to create cluster equal or less then the
	// available cores

	// let totalCPUs = os.cpus().length;
	let totalCPUs = os.availableParallelism();
	console.log(totalCPUs);
	for (let i = 0; i < totalCPUs; i++) {
		const worker = cluster.fork();
		worker.on('message', (msg) => {
			console.log(msg);
		});
	}

	//it will execute only new worker created using cluter.fork()
	cluster.on('online', (worker) => {
		console.log(`worker ${worker.process.pid} is online`);
	});

	//if any worker dies then below event will execute
	//
	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} is exited`);

		//if any worked dies then creating a new worker that will ensure
		// to make exect no of process equal to cores
		cluster.fork();
	});
} else {
	//execute if process is not main process
	const app = express();

	app.get('/light', (req, res) => {
		process.send({ msg: 'light request from parent' });
		res.send({ msg: 'ligt ok', id: process.pid });
	});

	app.get('/heavy', (req, res) => {
		let i = 0;
		while (i < 10000000000) {
			i++;
		}
		res.send({ msg: 'heavy completed', id: process.pid });
	});

	app.listen(PORT, () => {
		console.log('listening on port ', PORT);
	});
}

/*
JavaScript:
1. diff b/w let, const, var 
2. what is closure
3. what is score chaining
4. what is event loop, how javascript single threaded
5. diff b/w deep and shallow copy
6. prototype inheritance
7. diff b/w normal and arrow function
8. what are some ES6 features: arrow function, rest operator, spread operator, template string
9. what is hoisting
10. diff b/w session and local storage
11. setTimeout and setInterval
12. call, apply and bind method
13. what is callback, and callback hell
14. promises: => Promise.all, Promise.AllSettled, Promise.race, Promise.any methods
15. async and await keywork

16. question on: 
https://www.youtube.com/watch?v=C2CwSPCZyjc&list=PLeE6l33X9p1w4eY3G9kk6jHDyjAAPXkfa


React:
1. what is virtual dom
2. advantage of react over other technologies
3. Life cycle of React 
4. Basic hooks: useState, useEffect, useRef
5. diff b / w userMemo & useCallback hook 
6. context api 
7. how to access child component props 
8. implement componentDidMount, componentDidUpdate and componentWillUnmount using useEffect hook
9. state management: redux flow 
10. diff b/w props and state
11. what is jsx and how it is diff from html 
12. fetch api and axios library
13. diff b/w functional and class components
14. what is render props
15. what is hoc (high order component)
16. what is pure component


*/
