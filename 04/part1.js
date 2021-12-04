// To guarantee victory against the giant squid, figure out which board will
// win first. What will your final score be if you choose that board?

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

let win = false;
let winningBoard, lastDrawnNumber;

numbers.forEach(number => {
	// Delete the drawn number
	for (let i = 0; i < boards.length && !win; i++) {
		const board = boards[i];

		for (let j = 0; j < board.length; j++) {
			const row = board[j];

			for (let k = 0; k < row.length; k++) {
				const item = row[k];
				if (item == number) boards[i][j][k] = "";
			}
		}
	}

	if (!win) {
		// Check horizontally
		for (let i = 0; i < boards.length && !win; i++) {
			const board = boards[i];

			for (let j = 0; j < board.length && !win; j++) {
				const row = board[j];

				if (row.filter(item => item != "").length == 0) {
					win = true;
					winningBoard = board;
					lastDrawnNumber = parseInt(number);
				}
			}
		}

		// Check vertically
		for (let i = 0; i < boards.length && !win; i++) {
			const board = boards[i];

			for (let j = 0; j < board.length && !win; j++) {
				const column = [board[0][j], board[1][j], board[2][j], board[3][j], board[4][j]];

				if (column.filter(item => item != "").length == 0) {
					win = true;
					winningBoard = board;
					lastDrawnNumber = parseInt(number);
				}
			}
		}
	}
});

let remainingNumbersSum = 0;
winningBoard.forEach(row => {
	row.forEach(number => {
		if (number != "") remainingNumbersSum += parseInt(number);
	});
});

console.log(remainingNumbersSum * lastDrawnNumber);