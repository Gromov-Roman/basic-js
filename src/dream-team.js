const {NotImplementedError} = require('../extensions/index.js');

/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
    if (!members || !Array.isArray(members)) {
        return false;
    }

    const filtered = members.filter(member => !!member && typeof member === 'string')
        .map(member => member.trim())
        .filter(Boolean);

    if (!filtered.length) {
        return false;
    }

    console.log(filtered)
    return filtered
        .map(member => member[0].toUpperCase())
        .sort()
        .reduce((name, char) => name + char, '');
}

module.exports = {
    createDreamTeam
};
