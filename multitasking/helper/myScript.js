//to show the difference b/w spawn and exac method, we are using this file
// it is for 3. spawn-exec.js file

let interval = setInterval(() => {
	console.log('sachin');
	if (interval._idleStart > 5000) {
		clearInterval(interval);
	}
}, 1000);
