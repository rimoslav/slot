const highs = [1, 4, 7, 10];
const meds = [2, 5, 8, 11];
const lows = [3, 6, 9, 12];

export const makeMatrix = (keys) => {
	const matrix = [];
	keys.forEach((key, index) => {
		switch (key) {
			case 0:
				matrix.push([1, 2, 3]);
				break;
			case 180:
				matrix.push([12, 1, 2]);
				break;
			case 360:
				matrix.push([11, 12, 1]);
				break;
			case 540:
				matrix.push([10, 11, 12]);
				break;
			case 720:
				matrix.push([9, 10, 11]);
				break;
			case 900:
				matrix.push([8, 9, 10]);
				break;
			case 1080:
				matrix.push([7, 8, 9]);
				break;
			case 1260:
				matrix.push([6, 7, 8]);
				break;
			case 1440:
				matrix.push([5, 6, 7]);
				break;
			case 1620:
				matrix.push([4, 5, 6]);
				break;
			case 1800:
				matrix.push([3, 4, 5]);
				break;
			default:
				matrix.push([2, 3, 4]);
				break;
		}
	});
	console.log(transposeMatrix(matrix));
	return transposeMatrix(matrix);
};

export const transposeMatrix = (oldMatrix) => {
	const newMatrix = [[], [], []];
	oldMatrix.forEach((list, i) => {
		list.forEach((elem, j) => {
			newMatrix[j][i] = elem;
		});
	});
	return newMatrix;
};

export const checkForWin = (matrix, bet) => {
	const win1 = checkFor1(matrix, bet);
	const win2 = checkFor2(matrix, bet);
	const win3 = checkFor3(matrix, bet);
	const win4 = checkFor4(matrix, bet);
	const win5 = checkFor5(matrix, bet);
	const win6 = checkFor6(matrix, bet);
	const win7 = checkFor7(matrix, bet);
	const win8 = checkFor8(matrix, bet);
	const win9 = checkFor9(matrix, bet);
	const win10 = checkFor10(matrix, bet);
	const win11 = checkFor11(matrix, bet);
	const win12 = checkFor12(matrix, bet);
	const win13 = checkFor13(matrix, bet);
	const win14 = checkFor14(matrix, bet);
	const win15 = checkFor15(matrix, bet);
	return win1 + win2 + win3 + win4 + win5 + win6 + win7 + win8 + win9 + win10 + win11 + win12 + win13 + win14 + win15;
};

const checkFor1 = (m, bet) => {
	return count(m[1], 1, bet);
};
const checkFor2 = (m, bet) => {
	return count(m[0], 2, bet);
};
const checkFor3 = (m, bet) => {
	return count(m[2], 3, bet);
};
const checkFor4 = (m, bet) => {
	const payline = [m[0][0], m[1][1], m[2][2], m[1][3], m[0][4]];
	return count(payline, 4, bet);
};
const checkFor5 = (m, bet) => {
	const payline = [m[2][0], m[1][1], m[0][2], m[1][3], m[2][4]];
	return count(payline, 5, bet);
};
const checkFor6 = (m, bet) => {
	const payline = [m[0][0], m[0][1], m[1][2], m[0][3], m[0][4]];
	return count(payline, 6, bet);
};
const checkFor7 = (m, bet) => {
	const payline = [m[2][0], m[2][1], m[1][2], m[2][3], m[2][4]];
	return count(payline, 7, bet);
};
const checkFor8 = (m, bet) => {
	const payline = [m[1][0], m[2][1], m[2][2], m[2][3], m[1][4]];
	return count(payline, 8, bet);
};
const checkFor9 = (m, bet) => {
	const payline = [m[1][0], m[0][1], m[0][2], m[0][3], m[1][4]];
	return count(payline, 9, bet);
};
const checkFor10 = (m, bet) => {
	const payline = [m[1][0], m[0][1], m[1][2], m[0][3], m[1][4]];
	return count(payline, 10, bet);
};
const checkFor11 = (m, bet) => {
	const payline = [m[1][0], m[2][1], m[1][2], m[2][3], m[1][4]];
	return count(payline, 11, bet);
};
const checkFor12 = (m, bet) => {
	const payline = [m[0][0], m[1][1], m[0][2], m[1][3], m[0][4]];
	return count(payline, 12, bet);
};
const checkFor13 = (m, bet) => {
	const payline = [m[2][0], m[1][1], m[2][2], m[1][3], m[2][4]];
	return count(payline, 13, bet);
};
const checkFor14 = (m, bet) => {
	const payline = [m[1][0], m[1][1], m[0][2], m[1][3], m[1][4]];
	return count(payline, 14, bet);
};
const checkFor15 = (m, bet) => {
	const payline = [m[1][0], m[1][1], m[2][2], m[1][3], m[1][4]];
	return count(payline, 15, bet);
};

const allEqual = (matrix) => matrix.every((v) => v === matrix[0]);

const count = (matrix, payline_index, bet) => {
	let win = 0;
	if (allEqual(matrix)) {
		if (lows.indexOf(matrix[0]) > -1) {
			win = 5;
		} else if (matrix[0] === highs[1]) {
			win = 80;
		} else if (matrix[0] === meds[1]) {
			win = 40;
		} else if (matrix[0] === highs[2]) {
			win = 70;
		} else if (matrix[0] === meds[2]) {
			win = 30;
		} else if (matrix[0] === highs[3]) {
			win = 60;
		} else if (matrix[0] === meds[3]) {
			win = 20;
		} else if (matrix[0] === highs[4]) {
			win = 50;
		} else if (matrix[0] === meds[4]) {
			win = 10;
		}
	} else if (allEqual([matrix[0], matrix[1], matrix[2], matrix[3]])) {
		if (lows.indexOf(matrix[0]) > -1) {
			win = 3;
		} else if (matrix[0] === highs[1]) {
			win = 32;
		} else if (matrix[0] === meds[1]) {
			win = 15;
		} else if (matrix[0] === highs[2]) {
			win = 28;
		} else if (matrix[0] === meds[2]) {
			win = 12;
		} else if (matrix[0] === highs[3]) {
			win = 24;
		} else if (matrix[0] === meds[3]) {
			win = 9;
		} else if (matrix[0] === highs[4]) {
			win = 20;
		} else if (matrix[0] === meds[4]) {
			win = 6;
		}
	} else if (allEqual([matrix[0], matrix[1], matrix[2]])) {
		if (lows.indexOf(matrix[0]) > -1) {
			win = 1;
		} else if (matrix[0] === highs[1]) {
			win = 8;
		} else if (matrix[0] === meds[1]) {
			win = 5;
		} else if (matrix[0] === highs[2]) {
			win = 7;
		} else if (matrix[0] === meds[2]) {
			win = 4;
		} else if (matrix[0] === highs[3]) {
			win = 6;
		} else if (matrix[0] === meds[3]) {
			win = 3;
		} else if (matrix[0] === highs[4]) {
			win = 5;
		} else if (matrix[0] === meds[4]) {
			win = 2;
		}
	} else {
		win = 0;
	}
	if (win > 0) {
		console.log("Payline ", payline_index, "WIN: ", win, "*", bet);
	}
	return win;
};
