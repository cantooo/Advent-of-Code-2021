// How many measurements are larger than the previous measurement, in a set of three?

let input = require("fs").readFileSync("./01/input.txt", "utf8").split("\n");

for (let i = 0; i < input.length; i++) {
	input[i] = parseInt(input[i]);
}

let counter = 0

for (let i = 1; i < input.length - 2; i++) {
	let previousSum = input[i - 1] + input[i] + input[i + 1];
	let currentSum = input[i] + input[i + 1] + input[i + 2];

	if (currentSum > previousSum) counter++;
}

console.log(counter);