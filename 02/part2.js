// Using this new interpretation of the commands, calculate the horizontal
// position and depth you would have after following the planned course. What
// do you get if you multiply your final horizontal position by your final
// depth?

let input = require("fs").readFileSync("./02/input.txt", "utf8").split("\n");

for (let i = 0; i < input.length; i++) {
	input[i] = input[i].split(" ");
	input[i][1] = parseInt(input[i][1]);
}

let horizontalPosition = 0, depth = 0, aim = 0;

input.forEach(element => {
	switch (element[0]) {
		case "forward":
			horizontalPosition += element[1];
			depth += aim * element[1];
			break;
		case "down":
			aim += element[1];
			break;
		default:
			aim -= element[1];
			break;
	}
});

console.log(horizontalPosition * depth);