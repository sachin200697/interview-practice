process.on('message', (msg) => {
	let i = 0;
	while (i < 10000000000) {
		i++;
	}

	process.send({ count: i });
	process.exit(0);
});
