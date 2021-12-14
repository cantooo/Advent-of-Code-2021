// Find the three largest basins and multiply their sizes together. What do you
// get if you multiply together the sizes of the three largest basins?

class Point {
	/**
	 * @param {Number[][]} map 
	 * @param {Number} i 
	 * @param {Number} j 
	 */
	constructor(map, i, j) {
		this.point = map[i][j];
		this.i = i;
		this.j = j;
		this.belongsToBasin = false;

		this.left = function (map) {
			return map[this.i][this.j - 1];
		}
		this.right = function (map) {
			return map[this.i][this.j + 1];
		}
		this.top = function (map) {
			return ((map[this.i - 1] == undefined) ? undefined : map[this.i - 1]
			[this.j]);
		}
		this.bottom = function (map) {
			return ((map[this.i + 1]) == undefined ? undefined : map[this.i + 1]
			[this.j])
		}
		this.isLowPoint = function () {
			const top = this.top(input);
			const left = this.left(input);
			const right = this.right(input);
			const bottom = this.bottom(input);

			if (top == undefined) {
				if (left == undefined) {
					return this.point < right.point && this.point < bottom
						.point;
				}
				if (right == undefined) {
					return this.point < left.point && this.point < bottom.point;
				}
				return this.point < right.point && this.point < left.point &&
					this.point < bottom.point;
			}
			if (bottom == undefined) {
				if (left == undefined) {
					return this.point < right.point && this.point < top.point;
				}
				if (right == undefined) {
					return this.point < left.point && this.point < top.point;
				}
				return this.point < right.point && this.point < left.point &&
					this.point < top.point;
			}
			if (left == undefined) {
				return this.point < top.point && this.point < right.point &&
					this.point < bottom.point;
			}
			if (right == undefined) {
				return this.point < top.point && this.point < left.point &&
					this.point < bottom.point;
			}
			return this.point < top.point && this.point < left.point && this
				.point < right.point && this.point < bottom.point;
		}
	}
}

/**
 * @param {Point[][]} input 
 * @param {Point} point 
 * @param {Number} counter 
 */
function basinSize(point, counter) {
	const top = point.top(input);
	if (top != undefined) {
		if (top.point > point.point && !top.belongsToBasin && top.point != 9) {
			counter++;
			input[top.i][top.j].belongsToBasin = true;
			counter += basinSize(top, 0);
		}
	}

	const left = point.left(input);
	if (left != undefined) {
		if (left.point > point.point && !left.belongsToBasin && left.point != 9) {
			counter++;
			input[left.i][left.j].belongsToBasin = true;
			counter += basinSize(left, 0);
		}
	}

	const right = point.right(input);
	if (right != undefined) {
		if (right.point > point.point && !right.belongsToBasin && right.point != 9) {
			counter++;
			input[right.i][right.j].belongsToBasin = true;
			counter += basinSize(right, 0);
		}
	}

	const bottom = point.bottom(input);
	if (bottom != undefined) {
		if (bottom.point > point.point && !bottom.belongsToBasin && bottom.point != 9) {
			counter++;
			input[bottom.i][bottom.j].belongsToBasin = true;
			counter += basinSize(bottom, 0);
		}
	}

	return counter;
}

let input = require("fs").readFileSync("./09/input.txt", "utf8").split("\n");
input = input.map(line => line.split(""));
input.forEach((line, i) => {
	input[i] = line.map(number => parseInt(number));
});
input.forEach((line, i) => {
	input[i] = line.map((_, j) => new Point(input, i, j));
});

let lowPoints = [];
input.forEach((line, i) => {
	line.forEach((point, j) => {
		if (point.isLowPoint()) {
			input[i][j].belongsToBasin = true;
			point.belongsToBasin = true;
			lowPoints.push(point);
		}
	});
});

let basinSizes = [];
lowPoints.forEach((point, i) => {
	basinSizes.push(basinSize(point, 1));
});

basinSizes.sort((a, b) => b - a).splice(3);

console.log(basinSizes[0] * basinSizes[1] * basinSizes[2]);