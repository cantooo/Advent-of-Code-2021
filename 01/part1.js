// How many measurements are larger than the previous measurement?

let input = require("fs").readFileSync("./01/input.txt", "utf8").split("\n");

for (let i = 0; i < input.length; i++) {
	input[i] = parseInt(input[i]);
}

let counter = 0

for (let i = 1; i < input.length; i++) {
	if (input[i] > input[i - 1]) counter++;
}

console.log(counter);