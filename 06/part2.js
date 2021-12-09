// How many lanternfish would there be after 256 days?

let input = require("fs").readFileSync("./06/input.txt", "utf8").split(",");
let lanternfishSchool = {
	0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, new6: 0, new8: 0,
	sum: function () {
		return this[0] + this[1] + this[2] + this[3] + this[4] + this[5] + this
		[6] + this[7] + this[8];
	}
};

input.forEach(element => {
	lanternfishSchool[parseInt(element)]++;
});

for (let i = 0; i < 256; i++) {
	for (let timer = 0; timer <= 8; timer++) {
		if (timer == 0) {
			lanternfishSchool.new6 += lanternfishSchool[0];
			lanternfishSchool.new8 += lanternfishSchool[0];
			lanternfishSchool[0] = 0;
		} else {
			lanternfishSchool[timer - 1] += lanternfishSchool[timer];
			lanternfishSchool[timer] = 0;
		}
	}

	lanternfishSchool[6] += lanternfishSchool.new6;
	lanternfishSchool.new6 = 0;
	lanternfishSchool[8] += lanternfishSchool.new8;
	lanternfishSchool.new8 = 0;
}

console.log(lanternfishSchool.sum());