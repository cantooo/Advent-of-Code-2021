// Find the completion string for each incomplete line, score the completion
// strings, and sort the scores. What is the middle score?

let input = require("fs").readFileSync("./10/input.txt", "utf8").split("\n");
input.forEach(line => {
	line = line.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
});

const openingChars = "([{<", closingChars = ")]}>";

let completionScores = [];
input.forEach((line, i) => {
	let corrupted = false;

	for (let j = 0; j < line.length - 1; j++) {
		const char = line[j], nextChar = line[j + 1];

		if (openingChars.includes(char) && closingChars.includes(nextChar)) {
			if (openingChars.lastIndexOf(char) != closingChars.lastIndexOf(nextChar)) {
				corrupted = true;
				break;
			} else {
				input[i] = input[i].substring(0, j) + input[i].substring(j + 2);
				line = input[i];
				j = -1;
			}
		}
	}

	if (!corrupted) {
		completionScores.push(0);

		for (let j = line.length - 1; j >= 0; j--) {
			const char = line[j];

			completionScores[completionScores.length - 1] *= 5;

			switch (char) {
				case "(":
					line = line + ")";
					completionScores[completionScores.length - 1] += 1;
					break;
				case "[":
					line = line + "]";
					completionScores[completionScores.length - 1] += 2;
					break;
				case "{":
					line = line + "}";
					completionScores[completionScores.length - 1] += 3;
					break;
				case "<":
					line = line + ">";
					completionScores[completionScores.length - 1] += 4;
					break;

				default:
					break;
			}
		}
	}
});

completionScores.sort((a, b) => a - b);

console.log(completionScores[Math.floor(completionScores.length / 2)]);