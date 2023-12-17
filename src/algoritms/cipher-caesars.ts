export function caesarCipher(str: string, shift: number) {
    if (shift < 0) {
        // Обработка отрицательного сдвига
        return caesarCipher(str, shift + 26);
    }

    let result = "";

    for (let i = 0; i < str.length; i++) {
        let char = str[i];

        if (char.match(/[a-z]/i)) {
            // Определение регистра буквы
            const isUpperCase = char === char.toUpperCase();

            // Преобразование буквы с использованием шифра Цезаря
            char = String.fromCharCode(
                ((char.charCodeAt(0) - (isUpperCase ? 65 : 97) + shift) % 26) +
                (isUpperCase ? 65 : 97)
            );
        }

        result += char;
    }

    return result;
}

export function caesarDecipher(str: string, shift: number) {
    // Дешифрование равносильно шифрованию с отрицательным сдвигом
    return caesarCipher(str, -shift);
}