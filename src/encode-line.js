const {NotImplementedError} = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
    let result = '';
    let count = 1;

    const getPart = (char) => {
        if (count === 1) {
            return char;
        }

        const part = count + char;
        count = 1;
        return part;
    };

    str.split('').forEach((char, i) => {
        const nextChar = str[i + 1];

        if (!nextChar || nextChar !== char) {
            result += getPart(char);
        } else {
            count++;
        }
    });

    return result;
}

module.exports = {
    encodeLine
};
