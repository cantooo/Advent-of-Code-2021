// For each entry, determine all of the wire/segment connections and decode the
// four-digit output values. What do you get if you add up all of the output
// values?

let input = require("fs").readFileSync("./08/input.txt", "utf8").split("\n");
input.forEach((line, i) => {
	input[i] = line.split(" | ");
	input[i] = {
		signals: input[i][0].split(" "),
		outputValues: input[i][1].split(" ")
	};
});

let decodedNumbers = [];
input.forEach(line => {
	line.signals.sort((a, b) => a.length - b.length);
	line.signals.forEach((s, i) => {
		line.signals[i] = s.split("").sort((a, b) => a.charCodeAt(0) - b.
			charCodeAt(0)).join("");
	});
	let display = {
		top: "", topR: "", topL: "", center: "", bottomR: "",
		bottomL: "", bottom: ""
	};

	let numbers = { abcdefg: 8 };
	line.signals = line.signals.filter(s => s != "abcdefg");

	// 1
	numbers[line.signals[0]] = 1;
	display.topR = line.signals[0];
	display.bottomR = display.topR;
	line.signals.splice(0, 1);

	// 7
	numbers[line.signals[0]] = 7;
	display.top = line.signals[0].replace(display.bottomR.charAt(0), "")
		.replace(display.bottomR.charAt(1), "");
	line.signals.splice(0, 1);

	// 4
	numbers[line.signals[0]] = 4;
	display.topL = line.signals[0].replace(display.bottomR.charAt(0), "")
		.replace(display.bottomR.charAt(1), "");
	display.center = display.topL;
	line.signals.splice(0, 1);

	// 9
	display.bottom = line.signals.filter(s => s.length == 6
		&& s.includes(display.top) && s.includes(display.center[0])
		&& s.includes(display.center[1]) && s.includes(display.topR[0])
		&& s.includes(display.topR[1]))[0];
	numbers[display.bottom] = 9;
	line.signals = line.signals.filter(s => s != display.bottom);
	display.bottom = display.bottom.replace(display.bottomR.charAt(0), "")
		.replace(display.bottomR.charAt(1), "").replace(display.center
			.charAt(0), "")
		.replace(display.center.charAt(1), "").replace(display.top, "");

	// 6
	display.bottomL = line.signals.filter(s => s.length == 6 &&
		s.includes(display.top) && s.includes(display.center[0]) &&
		s.includes(display.center[1]) && s.includes(display.bottom) &&
		(s.includes(display.bottomR.charAt(0)) || s.includes(display.bottomR.
			charAt(1))))[0];
	numbers[display.bottomL] = 6;
	line.signals = line.signals.filter(s => s != display.bottomL);

	if (display.bottomL.includes(display.bottomR.charAt(0))) {
		display.bottomR = display.bottomR.charAt(0);
		display.topR = display.topR.charAt(1);
	} else {
		display.bottomR = display.bottomR.charAt(1);
		display.topR = display.topR.charAt(0);
	}

	display.bottomL = display.bottomL.replace(display.bottom, "")
		.replace(display.bottomR, "").replace(display.center.charAt(0), "")
		.replace(display.center.charAt(1), "").replace(display.top, "");

	// 0
	display.topL = line.signals.filter(s => s.length == 6)[0];
	line.signals = line.signals.filter(s => s != display.topL);
	numbers[display.topL] = 0;

	if (display.topL.includes(display.center.charAt(0))) {
		display.topL = display.center.charAt(0);
		display.center = display.center.charAt(1);
	} else {
		display.topL = display.center.charAt(1);
		display.center = display.center.charAt(0);
	}

	// 2
	numbers[line.signals.filter(s => s == (display.top + display.topR +
		display.center + display.bottomL + display.bottom).split("")
		.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""))[0]] = 2;

	// 5
	numbers[line.signals.filter(s => s == (display.top + display.topL +
		display.center + display.bottomR + display.bottom).split("")
		.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""))[0]] = 5;

	// 3
	numbers[line.signals.filter(s => s == (display.top + display.topR +
		display.center + display.bottomR + display.bottom).split("")
		.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join(""))[0]] = 3;

	line.outputValues.forEach((s, i) => {
		line.outputValues[i] = s.split("").sort((a, b) => a.charCodeAt(0) - b.
			charCodeAt(0)).join("");
		line.outputValues[i] = numbers[line.outputValues[i]];
	});

	decodedNumbers.push(parseInt(line.outputValues.join("")));
});

let sum = 0;
decodedNumbers.forEach(number => {
	sum += number;
});

console.log(sum);