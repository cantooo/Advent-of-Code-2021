// Find a way to simulate lanternfish. How many lanternfish would there be
// after 80 days?

let input = require("fs").readFileSync("./06/input.txt", "utf8").split(",");
let lanternfishSchool = [];

input.forEach(element => {
	lanternfishSchool.push(parseInt(element));
});

let pushToDoCount;

for (let i = 0; i < 80; i++) {
	pushToDoCount = 0;

	for (let j = 0; j < lanternfishSchool.length; j++) {
		const timer = lanternfishSchool[j];

		if (timer == 0) {
			pushToDoCount++;
			lanternfishSchool[j] = 6;
		} else lanternfishSchool[j]--;
	}
	for (let j = 0; j < pushToDoCount; j++) {
		lanternfishSchool.push(8);
	}
}

console.log(lanternfishSchool.length);