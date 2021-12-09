// In the output values, how many times do digits 1, 4, 7, or 8 appear?

let input = require("fs").readFileSync("./08/input.txt", "utf8").split("\n");
input.forEach((line, i) => {
	input[i] = line.substring(line.indexOf("| ") + 2);
	input[i] = input[i].split(" ");
});

let counter = 0;

input.forEach(line => {
	line.forEach(value => {
		if (value.length == 2 || value.length == 3 || value.length == 4 ||
			value.length == 7) counter++;
	});
});

console.log(counter);