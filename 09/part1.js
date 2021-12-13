// Find all of the low points on your heightmap. What is the sum of the risk
// levels of all low points on your heightmap?

let input = require("fs").readFileSync("./09/input.txt", "utf8").split("\n");
input.forEach((line, i) => {
	input[i] = line.split("");
	input[i] = input[i].map(number => parseInt(number));
});

let lowPoints = [];
for (let i = 0; i < input.length; i++) {
	const row = input[i];

	for (let j = 0; j < row.length; j++) {
		const point = {
			thisPoint: row[j],
			left: row[j - 1],
			right: row[j + 1],
			top: ((input[i - 1] == undefined) ? undefined : input[i - 1][j]),
			bottom: ((input[i + 1] == undefined) ? undefined : input[i + 1][j])
		}

		if (point.left == undefined) {
			if (point.top == undefined) {
				if (point.thisPoint < point.right && point.thisPoint < point
					.bottom) lowPoints.push(point.thisPoint);
			} else if (point.bottom == undefined) {
				if (point.thisPoint < point.right && point.thisPoint < point
					.top) lowPoints.push(point.thisPoint);
			} else {
				if (point.thisPoint < point.right && point.thisPoint < point
					.top && point.thisPoint < point.bottom) lowPoints
						.push(point.thisPoint);
			}
		} else if (point.right == undefined) {
			if (point.top == undefined) {
				if (point.thisPoint < point.left && point.thisPoint < point
					.bottom) lowPoints.push(point.thisPoint);
			} else if (point.bottom == undefined) {
				if (point.thisPoint < point.left && point.thisPoint < point
					.top) lowPoints.push(point.thisPoint);
			} else {
				if (point.thisPoint < point.left && point.thisPoint < point
					.top && point.thisPoint < point.bottom) lowPoints
						.push(point.thisPoint);
			}
		} else if (point.top == undefined) {
			if (point.thisPoint < point.left && point.thisPoint < point.right
				&& point.thisPoint < point.bottom) lowPoints.push(point
					.thisPoint);
		} else if (point.bottom == undefined) {
			if (point.thisPoint < point.left && point.thisPoint < point.right
				&& point.thisPoint < point.top) lowPoints.push(point.thisPoint);
		} else {
			if (point.thisPoint < point.left && point.thisPoint < point.right
				&& point.thisPoint < point.bottom && point.thisPoint < point
					.top) lowPoints.push(point.thisPoint);
		}
	}
}

let sum = 0;
lowPoints.forEach(point => {
	sum += point + 1;
});

console.log(sum);