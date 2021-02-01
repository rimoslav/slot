// Indexes of high, medium and low syms on background image
const highs = [1, 4, 7, 10];
const meds = [2, 5, 8, 11];
const lows = [3, 6, 9, 12];
/**
 * @param {Array} keys Array of current position of each reel, array of 5 elements.
 * Keys array containes numbers from 0 to 11, each multiplied by 180, which line height.
 * @return {Array<Array>} Array of arrays - symbols on 2nd 1st and 3rd payline.
 * */
export const makeMatrix = (keys) => {
	const matrix = [];
	keys.forEach((key, index) => {
		const key1 = (13 - key / 180) % 12 === 0 ? 12 : (13 - key / 180) % 12;
		const key2 = (14 - key / 180) % 12 === 0 ? 12 : (14 - key / 180) % 12;
		const key3 = (15 - key / 180) % 12 === 0 ? 12 : (15 - key / 180) % 12;
		matrix.push([key1, key2, key3]);
	});
	// Matrix is an array of 5 arrays, all containing 3 elements which represent 3 symbols per reel (5x3 matrix)
	// Matrix is transposed so we get 3x5 matrix, 3 arrays each containing 5 elements, which are located on 2nd, 1st and 3rd payline respectively
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
/**
 * Check for all 15 paylines and sum up all the winnings.
 * @param {Array<Array>} matrix Transposed matrix from makeMatrix function.
 * @param bet Current bet set by the user.
 * @return Sum of all winnings on all 15 paylines
 */
export const checkForWin = (matrix, bet) => {
	const win1 = checkPayline1(matrix, bet);
	const win2 = checkPayline2(matrix, bet);
	const win3 = checkPayline3(matrix, bet);
	const win4 = checkPayline4(matrix, bet);
	const win5 = checkPayline5(matrix, bet);
	const win6 = checkPayline6(matrix, bet);
	const win7 = checkPayline7(matrix, bet);
	const win8 = checkPayline8(matrix, bet);
	const win9 = checkPayline9(matrix, bet);
	const win10 = checkPayline10(matrix, bet);
	const win11 = checkPayline11(matrix, bet);
	const win12 = checkPayline12(matrix, bet);
	const win13 = checkPayline13(matrix, bet);
	const win14 = checkPayline14(matrix, bet);
	const win15 = checkPayline15(matrix, bet);
	return win1 + win2 + win3 + win4 + win5 + win6 + win7 + win8 + win9 + win10 + win11 + win12 + win13 + win14 + win15;
};

/* Each of these 15 functions takes 5x3 matrix and makes one array which presented on the slot machine represent positions of syms on that specific payline
 * For this specific matrix:
 *  [
 *     [1, 4, 2, 7, 11],
 *     [2, 5, 3, 8, 12],
 *     [3, 6, 4, 9, 1]]
 *  ]
 * checkPayline3 would inspect syms on [3, 6, 4, 9, 1]
 * checkPayline8 would inspect syms on [2, 6, 4, 9, 12]
 * checkPayline11 would inspect syms on [2, 6, 3, 9, 12];
 * There need to be at least 3 of the same symbols per payline starting from the 1st reel.
 * More of the same syms - bigger the winning. Low syms are all valued the same, medium and high are 8 differently valued syms.
 * Here's the visual representation of 15 paylines
 * https://firebasestorage.googleapis.com/v0/b/slot-machine-4f0bf.appspot.com/o/paylines.png?alt=media&token=3dcefbf7-3df3-4891-8ad7-9465e4918828
 */
const checkPayline1 = (m, bet) => {
	return count(m[1], 1, bet);
};
const checkPayline2 = (m, bet) => {
	return count(m[0], 2, bet);
};
const checkPayline3 = (m, bet) => {
	return count(m[2], 3, bet);
};
const checkPayline4 = (m, bet) => {
	const payline = [m[0][0], m[1][1], m[2][2], m[1][3], m[0][4]];
	return count(payline, 4, bet);
};
const checkPayline5 = (m, bet) => {
	const payline = [m[2][0], m[1][1], m[0][2], m[1][3], m[2][4]];
	return count(payline, 5, bet);
};
const checkPayline6 = (m, bet) => {
	const payline = [m[0][0], m[0][1], m[1][2], m[0][3], m[0][4]];
	return count(payline, 6, bet);
};
const checkPayline7 = (m, bet) => {
	const payline = [m[2][0], m[2][1], m[1][2], m[2][3], m[2][4]];
	return count(payline, 7, bet);
};
const checkPayline8 = (m, bet) => {
	const payline = [m[1][0], m[2][1], m[2][2], m[2][3], m[1][4]];
	return count(payline, 8, bet);
};
const checkPayline9 = (m, bet) => {
	const payline = [m[1][0], m[0][1], m[0][2], m[0][3], m[1][4]];
	return count(payline, 9, bet);
};
const checkPayline10 = (m, bet) => {
	const payline = [m[1][0], m[0][1], m[1][2], m[0][3], m[1][4]];
	return count(payline, 10, bet);
};
const checkPayline11 = (m, bet) => {
	const payline = [m[1][0], m[2][1], m[1][2], m[2][3], m[1][4]];
	return count(payline, 11, bet);
};
const checkPayline12 = (m, bet) => {
	const payline = [m[0][0], m[1][1], m[0][2], m[1][3], m[0][4]];
	return count(payline, 12, bet);
};
const checkPayline13 = (m, bet) => {
	const payline = [m[2][0], m[1][1], m[2][2], m[1][3], m[2][4]];
	return count(payline, 13, bet);
};
const checkPayline14 = (m, bet) => {
	const payline = [m[1][0], m[1][1], m[0][2], m[1][3], m[1][4]];
	return count(payline, 14, bet);
};
const checkPayline15 = (m, bet) => {
	const payline = [m[1][0], m[1][1], m[2][2], m[1][3], m[1][4]];
	return count(payline, 15, bet);
};

/**
 * Checks if all elements in an array are equal.
 * We check all 5 elements per payline, if they are not equal, we make an array of first 4 elements and check it the same way. If not true we check for first three.
 * @param {Array} matrix - First 3, first 4 or all 5 elements in payline
 * @return {Boolean} If all equal returns true, otherwise returns false.
 */
const allEqual = (matrix) => matrix.every((v) => v === matrix[0]);

/**
 *
 * @param {Array} matrix - Payline elements.
 * @param {Integer} payline_index - Payline index used only for dev purposes and result previewing in console log.
 * @param {Integer} bet - Users current bet value - also used for dev purposes to better display the calculation.
 * @return {Integer} Win is added to other wins from other paylines.
 * Each of these win values is multiplied by bet value in App.js to get the total win value. It's separated like this for console logging and matching this chart:
 * https://firebasestorage.googleapis.com/v0/b/slot-machine-4f0bf.appspot.com/o/syms.png?alt=media&token=98ccaf8b-16bf-4723-9b1d-688be78c239e
 */
const count = (matrix, payline_index, bet) => {
	let win = 0;
	if (allEqual(matrix)) {
		if (lows.indexOf(matrix[0]) > -1) {
			win = 5;
		} else if (meds.indexOf(matrix[0]) > -1) {
			win = 10 + (3 - meds.indexOf(matrix[0])) * 10;
		} else if (highs.indexOf(matrix[0]) > -1) {
			win = 50 + (3 - highs.indexOf(matrix[0])) * 10;
		}
	} else if (allEqual([matrix[0], matrix[1], matrix[2], matrix[3]])) {
		if (lows.indexOf(matrix[0]) > -1) {
			win = 3;
		} else if (meds.indexOf(matrix[0]) > -1) {
			win = 6 + (3 - meds.indexOf(matrix[0])) * 3;
		} else if (highs.indexOf(matrix[0]) > -1) {
			win = 20 + (3 - highs.indexOf(matrix[0])) * 4;
		}
	} else if (allEqual([matrix[0], matrix[1], matrix[2]])) {
		if (lows.indexOf(matrix[0]) > -1) {
			win = 1;
		} else if (meds.indexOf(matrix[0]) > -1) {
			win = 8 - meds.indexOf(matrix[0]);
		} else if (highs.indexOf(matrix[0]) > -1) {
			win = 5 - highs.indexOf(matrix[0]);
		}
	} else {
		win = 0;
	}
	if (win > 0) {
		console.log("Payline ", payline_index, "WIN: ", win, "*", bet);
	}
	return win;
};
