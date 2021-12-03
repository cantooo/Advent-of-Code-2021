// Use the binary numbers in your diagnostic report to calculate the gamma rate
// and epsilon rate, then multiply them together. What is the power consumption
// of the submarine? (Be sure to represent your answer in decimal, not binary.)

let input = require("fs").readFileSync("./03/input.txt", "utf8").split("\n");

let gammaRate = "", epsilonRate = "";

for (let i = 0; i < input[0].length; i++) {
	let ones = 0, zeroes = 0;

	for (let j = 0; j < input.length; j++) {
		const number = input[j].charAt(i);
		if (number == "1") ones++;
		else zeroes++;
	}

	if (ones > zeroes) {
		gammaRate += "1";
		epsilonRate += "0";
	} else {
		gammaRate += "0";
		epsilonRate += "1";
	}
}

gammaRate = parseInt(gammaRate, 2);
epsilonRate = parseInt(epsilonRate, 2);

console.log(gammaRate * epsilonRate);