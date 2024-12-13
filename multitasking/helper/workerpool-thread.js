import workerpool from 'workerpool';

function heavyComputation() {
	workerpool.workerEmit('Starting heavy calculation');
	let i = 0;
	while (i < 1000000000) {
		i++;
	}
	workerpool.workerEmit('Calculation is done');
	return i;
}

workerpool.worker({
	heavyComputation,
});
