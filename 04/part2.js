// Figure out which board will win last. Once it wins, what would its final
// score be?

let input = require("fs").readFileSync("./04/input.txt", "utf8").split("\n");
let numbers = input[0].split(",");
let boardsToDivide = input.filter(data => data.length == 14);
let boards = [];

for (let i = 0; i < boardsToDivide.length; i += 5) {
	boards.push([boardsToDivide[i], boardsToDivide[i + 1], boardsToDivide[i + 2]
		, boardsToDivide[i + 3], boardsToDivide[i + 4]]);
}

for (let i = 0; i < boards.length; i++) {
	for (let j = 0; j < boards[i].length; j++) {
		boards[i][j] = boards[i][j].split(" ").filter(number => number.length
			!= 0);
	}
}

let lastDrawnNumber, found = false;

numbers.forEach(drawnNumber => {
	if (found) {
		return;
	}

	for (let i = 0; i < boards.length && boards.length >= 1; i++) {
		const board = boards[i];

		for (let j = 0; j < board.length; j++) {
			const row = board[j];

			for (let k = 0; k < row.length; k++) {
				const item = row[k];
				if (item == drawnNumber) boards[i][j][k] = "";
			}
		}
	}

	if (boards.length >= 1) {
		for (let i = 0; i < boards.length && boards.length >= 1; i++) {
			const board = boards[i];

			if (found) break;

			for (let j = 0; j < board.length && boards.length >= 1; j++) {
				const row = board[j];
				const column = [board[0][j], board[1][j], board[2][j], board[3][j], board[4][j]];

				if (row.filter(item => item != "").length == 0) {
					if (boards.length != 1) boards.splice(i, 1);
					else found = true;
					lastDrawnNumber = parseInt(drawnNumber);
					i = -1;
					break;
				}
				if (column.filter(item => item != "").length == 0) {
					if (boards.length != 1) boards.splice(i, 1);
					else found = true;
					lastDrawnNumber = parseInt(drawnNumber);
					i = -1;
					break;
				}
			}
		}
	}
});

let remainingNumbersSum = 0;
boards[0].forEach(row => {
	row.forEach(number => {
		if (number != "") remainingNumbersSum += parseInt(number);
	});
});

console.log(remainingNumbersSum * lastDrawnNumber);