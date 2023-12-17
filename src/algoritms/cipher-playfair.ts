function createPlayfairTable(key: string) {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    const keyMatrix = Array(5)
        .fill(null)
        .map(() => Array(5).fill(null));

    const keyWithoutJ = key.replace(/J/g, "I");

    let keyChars = (keyWithoutJ + alphabet).split("").filter((value, index, self) => self.indexOf(value) === index);

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            keyMatrix[row][col] = keyChars.shift();
        }
    }

    return keyMatrix;
}

function findCharPosition(matrix: string[][], char: string) {
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (matrix[row][col] === char) {
                return {row, col};
            }
        }
    }
}

export function playfairEncrypt(plaintext: string, key: string) {
    const table = createPlayfairTable(key);
    let ciphertext = "";

    plaintext = plaintext.replace(/J/g, "I").toUpperCase().replace(/[^A-Z]/g, "");

    for (let i = 0; i < plaintext.length; i += 2) {
        const char1 = plaintext[i];
        const char2 = i + 1 < plaintext.length ? plaintext[i + 1] : "X";

        const pos1 = findCharPosition(table, char1);
        const pos2 = findCharPosition(table, char2);

        if (pos1 && pos2)
            if (pos1.row === pos2.row) {
                ciphertext += table[pos1.row][(pos1.col + 1) % 5];
                ciphertext += table[pos2.row][(pos2.col + 1) % 5];
            } else if (pos1.col === pos2.col) {
                ciphertext += table[(pos1.row + 1) % 5][pos1.col];
                ciphertext += table[(pos2.row + 1) % 5][pos2.col];
            } else {
                ciphertext += table[pos1.row][pos2.col];
                ciphertext += table[pos2.row][pos1.col];
            }
    }

    return ciphertext;
}

export function playfairDecrypt(ciphertext: string, key: string) {
    const table = createPlayfairTable(key);
    let plaintext = "";

    ciphertext = ciphertext.toUpperCase().replace(/[^A-Z]/g, "");

    for (let i = 0; i < ciphertext.length; i += 2) {
        const char1 = ciphertext[i];
        const char2 = i + 1 < ciphertext.length ? ciphertext[i + 1] : "X";

        const pos1 = findCharPosition(table, char1);
        const pos2 = findCharPosition(table, char2);

        if (pos1 && pos2)
            if (pos1.row === pos2.row) {
                plaintext += table[pos1.row][(pos1.col + 4) % 5];
                plaintext += table[pos2.row][(pos2.col + 4) % 5];
            } else if (pos1.col === pos2.col) {
                plaintext += table[(pos1.row + 4) % 5][pos1.col];
                plaintext += table[(pos2.row + 4) % 5][pos2.col];
            } else {
                plaintext += table[pos1.row][pos2.col];
                plaintext += table[pos2.row][pos1.col];
            }
    }

    return plaintext;
}