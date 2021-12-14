// Find the first illegal character in each corrupted line of the navigation
// subsystem. What is the total syntax error score for those errors?

let input = require("fs").readFileSync("./10/input.txt", "utf8").split("\n");
input.forEach(line => {
	line = line.split("").sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
});

const openingChars = "([{<", closingChars = ")]}>";

let syntaxErrorScore = 0;
input.forEach((line, i) => {
	for (let j = 0; j < line.length - 1; j++) {
		const char = line[j], nextChar = line[j + 1];

		if (openingChars.includes(char) && closingChars.includes(nextChar)) {
			if (openingChars.lastIndexOf(char) != closingChars.lastIndexOf(nextChar)) {
				switch (nextChar) {
					case ")":
						syntaxErrorScore += 3;
						break;
					case "]":
						syntaxErrorScore += 57;
						break;
					case "}":
						syntaxErrorScore += 1197;
						break;
					default:
						syntaxErrorScore += 25137;
						break;
				}

				break;
			} else {
				input[i] = input[i].substring(0, j) + input[i].substring(j + 2);
				line = input[i];
				j = -1;
			}
		}
	}
});

console.log(syntaxErrorScore);