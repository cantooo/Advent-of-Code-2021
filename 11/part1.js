// Given the starting energy levels of the dumbo octopuses in your cavern,
// simulate 100 steps. How many total flashes are there after 100 steps?

class Octopus {
	/**
	 * 
	 * @param {[[]]} map 
	 * @param {Number} i 
	 * @param {Number} j 
	 */
	constructor(map, i, j) {
		this.energy = map[i][j];
		this.flashed = false;
		this.line = i;
		this.column = j;
		this.top = () => ((input[this.line - 1] == undefined) ? undefined : input[this.line - 1][this.column]);
		this.topRight = () => ((input[this.line - 1] == undefined) ? undefined : input[this.line - 1][this.column + 1]);
		this.right = () => input[this.line][this.column + 1];
		this.bottomRight = () => ((input[this.line + 1] == undefined) ? undefined : input[this.line + 1][this.column + 1]);
		this.bottom = () => ((input[this.line + 1] == undefined) ? undefined : input[this.line + 1][this.column]);
		this.bottomLeft = () => ((input[this.line + 1] == undefined) ? undefined : input[this.line + 1][this.column - 1]);
		this.left = () => input[this.line][this.column - 1];
		this.topLeft = () => ((input[this.line - 1] == undefined) ? undefined : input[this.line - 1][this.column - 1]);

		this.flash = function () {
			this.flashed = true;

			const top = this.top();
			if (top != undefined) {
				top.energy++;

				if (top.energy > 9 && !top.flashed) top.flash();
			}

			const topRight = this.topRight();
			if (topRight != undefined) {
				topRight.energy++;

				if (topRight.energy > 9 && !topRight.flashed) topRight.flash();
			}

			const right = this.right();
			if (right != undefined) {
				right.energy++;

				if (right.energy > 9 && !right.flashed) right.flash();
			}

			const bottomRight = this.bottomRight();
			if (bottomRight != undefined) {
				bottomRight.energy++;

				if (bottomRight.energy > 9 && !bottomRight.flashed) bottomRight.flash();
			}

			const bottom = this.bottom();
			if (bottom != undefined) {
				bottom.energy++;

				if (bottom.energy > 9 && !bottom.flashed) bottom.flash();
			}

			const bottomLeft = this.bottomLeft();
			if (bottomLeft != undefined) {
				bottomLeft.energy++;

				if (bottomLeft.energy > 9 && !bottomLeft.flashed) bottomLeft.flash();
			}

			const left = this.left();
			if (left != undefined) {
				left.energy++;

				if (left.energy > 9 && !left.flashed) left.flash();
			}

			const topLeft = this.topLeft();
			if (topLeft != undefined) {
				topLeft.energy++;

				if (topLeft.energy > 9 && !topLeft.flashed) topLeft.flash();
			}
		}
	}
}

let input = require("fs").readFileSync("./11/input.txt", "utf8").split("\n");
input.forEach((line, i) => {
	input[i] = line.split("");
	input[i] = input[i].map(number => parseInt(number));
});
input.forEach((line, i) => {
	line.forEach((_number, j) => {
		input[i][j] = new Octopus(input, i, j);
	});
});

let flashCount = 0;
for (let step = 0; step < 100; step++) {
	input.forEach((line, i) => {
		line.forEach((_octopus, j) => {
			input[i][j].energy++;
		});
	});

	input.forEach((line, i) => {
		line.forEach((_octopus, j) => {
			if (input[i][j].energy > 9 && !input[i][j].flashed) input[i][j].flash();
		});
	});

	input.forEach((line, i) => {
		line.forEach((_octopus, j) => {
			if (input[i][j].flashed) {
				flashCount++;
				input[i][j].energy = 0;
				input[i][j].flashed = false;
			}
		});
	});
}

console.log(flashCount);