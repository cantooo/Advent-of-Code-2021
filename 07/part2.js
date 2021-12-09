// Determine the horizontal position that the crabs can align to using the
// least fuel possible so they can make you an escape route! How much fuel must
// they spend to align to that position?

let input = require("fs").readFileSync("./07/input.txt", "utf8").split(",");
input.forEach((n, i) => {
	input[i] = parseInt(n);
});

let maxPos = input.sort((a, b) => b - a)[0];
let minFuel;

for (let pos = 0; pos < maxPos; pos++) {
	let fuelSum = 0;

	for (let i = 0; i < input.length; i++) {
		const crabPos = input[i];
		let stepsRequired = Math.abs(crabPos - pos);
		let fuelRequired = 0;

		for (let j = 1; j <= stepsRequired; j++) {
			fuelRequired += j;
		}

		fuelSum += fuelRequired;
	}

	if (pos == 0) minFuel = fuelSum;
	else if (fuelSum < minFuel) minFuel = fuelSum;
}

console.log(minFuel);