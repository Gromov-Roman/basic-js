const {NotImplementedError} = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */

const Controls = {
    discardNext: '--discard-next', // excludes the next element of the array from the transformed array.
    discardPrev: '--discard-prev', // excludes the previous element of the array from the transformed array.
    doubleNext: '--double-next', // doubles the next element of the array in the transformed array.
    doublePrev: '--double-prev' // doubles the previous element of the array in the transformed array.
};

function transform(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('\'arr\' parameter must be an instance of the Array!');
    }

    if (!arr.length) {
        return [];
    }

    const result = [];

    for (i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case Controls.discardNext:
                arr[i + 1] = null;
                i += 2;
                continue;
            case Controls.discardPrev:
                if (arr[i - 1]) result.pop();
                break;
            case Controls.doubleNext:
                if (arr[i + 1] && Number.isInteger(arr[i + 1])) {
                    result.push(arr[i + 1]);
                }
                break;
            case Controls.doublePrev:
                if (arr[i - 1] && Number.isInteger(arr[i - 1])) result.push(arr[i - 1]);
                break;
            default:
                result.push(arr[i]);
        }
    }

    return result;
}

module.exports = {
    transform
};
