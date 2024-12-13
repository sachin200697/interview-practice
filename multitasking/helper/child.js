console.log(process.argv); //it is an array, first two args will be static for node
// executables and other will be passed by parent process (in this case by 5. fork.js)
/*
[
  'C:\\Program Files\\nodejs\\node.exe',
  'c:\\Users\\HP 14-dh1026TX\\Desktop\\Interview\\interview1\\multitasking\\helper\\child.js',
  'hello',
  '1',
  '{"nane":"sachin"}'
]
*/

//all process implements event emitter so they can lister to the events
process.on('message', (msg) => {
	console.log('Message from parent:');
	console.log(msg); //{ message: 'a message from parent process: 5. fork.js' }

	process.send({ msgFromChild: 'A message from child process' });

	// if we don't use exit method then child process will still be running
	// to listern future events that might occur
	process.exit(0); //code 0 means it is not expecting any furter operations
});

console.log('child process executed');
