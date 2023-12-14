const {NotImplementedError} = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */

class VigenereCipheringMachine {
    isDirect;

    constructor(isDirect) {
        this.isDirect = isDirect;
    }

    static isUpperCase(char) {
        return char === char.toUpperCase();
    }

    encrypt(message, key) {
        return this.transform(message, key, this.getEncryptedKey);
    }

    decrypt(message, key) {
        return this.transform(message, key, this.getDecryptedKey);
    }

    transform(message, key, func) {
        if (typeof message !== 'string' || typeof key !== 'string') {
            throw new Error('Incorrect arguments!');
        }

        if (this.isDirect === false) {
            message = message.split('').reverse().join('');
        }

        let shift = 0;
        return message
            .split('')
            .map((char) => {
                if (!this.isLetter(char)) {
                    return char;
                }

                const newChar = func(char, key, shift);
                shift = ++shift % key.length;
                return newChar.toUpperCase();
            })
            .join('');
    }

    getEncryptedKey(char, key, shift) {
        const code = char.charCodeAt(0);

        if (VigenereCipheringMachine.isUpperCase(char)) {
            const keyCode = key.toUpperCase().charCodeAt(shift);

            return String.fromCharCode((code + keyCode - 2 * 65) % 26 + 65);
        } else {
            const keyCode = key.toLowerCase().charCodeAt(shift);

            return String.fromCharCode((code + keyCode - 2 * 97) % 26 + 97);
        }
    }

    getDecryptedKey(char, key, shift) {
        const code = char.charCodeAt(0);

        if (VigenereCipheringMachine.isUpperCase(char)) {
            const keyCode = key.toUpperCase().charCodeAt(shift);

            return String.fromCharCode(90 - (25 - (code - keyCode)) % 26);
        } else {
            const keyCode = key.toLowerCase().charCodeAt(shift);

            return String.fromCharCode(122 - (25 - (code + keyCode)) % 26);
        }
    }

    isLetter(char) {
        return char.match(/[a-zA-Z]/i);
    }
}

module.exports = {
    VigenereCipheringMachine
};
