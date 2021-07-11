const round = (number, decimal) => {
    const factor = Math.pow(10,decimal)
    return Math.round(number*factor)/factor
};

const arraysMatch = function (arr1, arr2) {
	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;
	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	// Otherwise, return true
	return true;
};

export {round, arraysMatch}