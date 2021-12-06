// Consider only horizontal and vertical lines. At how many points do at least
// two lines overlap?

let input = require("fs").readFileSync("./05/input.txt", "utf8").split("\n");
let coordinatesSet = [[]];
let map = [[]]

input.forEach((element, i) => {
	let coordinates = element.split(" -> ");
	coordinates.forEach((xy, j) => {
		coordinates[j] = xy.split(",")
		coordinates[j][0] = parseInt(coordinates[j][0]);
		coordinates[j][1] = parseInt(coordinates[j][1]);
	});
	coordinatesSet[i] = coordinates;
});

coordinatesSet.forEach(coordinates => {
	const x1 = coordinates[0][0];
	const y1 = coordinates[0][1];
	const x2 = coordinates[1][0];
	const y2 = coordinates[1][1];

	if (x1 == x2) {
		let x = x1;

		if (y1 < y2) {
			for (let y = y1; y <= y2; y++) {
				if (map[x] == undefined) map[x] = [];
				if (map[x][y] == undefined) map[x][y] = 0;
				map[x][y]++;
			}
		} else {
			for (let y = y2; y <= y1; y++) {
				if (map[x] == undefined) map[x] = [];
				if (map[x][y] == undefined) map[x][y] = 0;
				map[x][y]++;
			}
		}
	}
	else if (y1 == y2) {
		let y = y1;

		if (x1 < x2) {
			for (let x = x1; x <= x2; x++) {
				if (map[x] == undefined) map[x] = [];
				if (map[x][y] == undefined) map[x][y] = 0;
				map[x][y]++;
			}
		} else {
			for (let x = x2; x <= x1; x++) {
				if (map[x] == undefined) map[x] = [];
				if (map[x][y] == undefined) map[x][y] = 0;
				map[x][y]++;
			}
		}
	}
});

let linesCount = 0;

map.forEach((x, i) => {
	x.forEach((y, j) => {
		if (y >= 2) linesCount++;
	});
});

console.log(linesCount);