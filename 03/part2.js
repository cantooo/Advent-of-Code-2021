// Use the binary numbers in your diagnostic report to calculate the oxygen 
// generator rating and CO2 scrubber rating, then multiply them together. What
// is the life support rating of the submarine? (Be sure to represent your
// answer in decimal, not binary.)

let input = require("fs").readFileSync("./03/input.txt", "utf8").split("\n");

let oxygenGeneratorValues = input, CO2ScrubberValues = input;

for (let i = 0; i < oxygenGeneratorValues[0].length; i++) {
	let ones = 0, zeroes = 0;

	for (let j = 0; j < oxygenGeneratorValues.length; j++) {
		const number = oxygenGeneratorValues[j].charAt(i);
		if (number == "1") ones++;
		else zeroes++;
	}

	let filtered;

	if (ones >= zeroes) {
		filtered = oxygenGeneratorValues.filter(number => number.charAt(i) ==
			"1");
		if (filtered.length != 0) oxygenGeneratorValues = filtered;
	} else {
		filtered = oxygenGeneratorValues.filter(number => number.charAt(i) ==
			"0");
		if (filtered.length != 0) oxygenGeneratorValues = filtered;
	}

}

let oxygenGeneratorRating = parseInt(oxygenGeneratorValues[0], 2);

for (let i = 0; i < CO2ScrubberValues[0].length; i++) {
	let ones = 0, zeroes = 0;

	for (let j = 0; j < CO2ScrubberValues.length; j++) {
		const number = CO2ScrubberValues[j].charAt(i);
		if (number == "1") ones++;
		else zeroes++;
	}

	let filtered;

	if (ones >= zeroes) {
		filtered = CO2ScrubberValues.filter(number => number.charAt(i) ==
			"0");
		if (filtered.length != 0) CO2ScrubberValues = filtered;
	} else {
		filtered = CO2ScrubberValues.filter(number => number.charAt(i) ==
			"1");
		if (filtered.length != 0) CO2ScrubberValues = filtered;
	}

}

let CO2ScrubberRating = parseInt(CO2ScrubberValues[0], 2);

console.log(oxygenGeneratorRating * CO2ScrubberRating);