function quicksort(array) {
	if (array.length == 0) return array;
	const pivot = array.splice(0, 1)
	return quicksort(array.filter(x => x <= pivot))
		.concat([pivot])
		.concat(quicksort(array.filter(x => x > pivot)))
}