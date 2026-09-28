0->1 | <krypton1 password>
    echo S1JZUFRPTklTR1JFQVQ= | base64 -d
    let data = 'S1JZUFRPTklTR1JFQVQ=';
    let buff = new Buffer(data, 'base64');
    let text = buff.toString('ascii');

    console.log(text);
1->2 | <krypton2 password>
    alias rot13="tr 'A-Za-z' 'N-ZA-Mn-za-m'"
    cat krypton2  | rot13
2->3 |
    function _rotate(charIndex, numericKey, alphabetLength = 26) {
    return (charIndex + numericKey) % alphabetLength;
    }
    function caesarRotate(char, key) {
    const base = 65;
    return String.fromCharCode(_rotate(char.charCodeAt() - base, key) + base);
    }
    console.log([..."ABCDEFGHJKLMNOPQRSTUVWXYZ"].map(letter =>caesarRotate(letter, 1)))

    const cypherText = "OMQEMDUEQMEK";

    const posibleKeys = Array.from(Array(25)).map((_, i) => i +1);
    const posibleSolutions = posibleKeys.map((numericKey) => {
    return Array.from(cypherText)
        .map((letter) => caesarRotate(letter, numericKey))
        .join("");
    });
    console.log(posibleSolutions);