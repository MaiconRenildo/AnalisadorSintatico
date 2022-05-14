const {
  isDigit,
  isSpace,
  isLetter,
  isOperator,
  isAssigment,
  isComparison,
  isPunctuation,
} = require("../util/util");

module.exports.letterAutomaton = (code, position, reservedWords, ids) => {
  let word = `${code[position]}`;
  let end = position;

  const fillWord = () => {
    for (let i = position + 1; i <= code.length; i++) {
      if (isSpace(code[i]) || i == code.length) {
        end = i - 1;
        i = code.length;
      } else if (isLetter(code[i]) || isDigit(code[i])) {
        word = word + `${code[i]}`;
      } else if (
        isComparison(code[i]) ||
        isPunctuation(code[i]) ||
        isAssigment(code[i]) ||
        isOperator(code[i])
      ) {
        end = i - 1;
        i = code.length;
      } else {
        throw `Símbolo inválido: ${code[position]}`;
      }
    }

    return code.length - 1;
  };

  fillWord();

  const findWordOnReservedWords = reservedWords.find((string) => {
    return word === string;
  });

  if (findWordOnReservedWords) {
    return { token: `<${word},>`, end };
  } else {
    const findWordOnIds = ids.find((array) => {
      if (array) {
        return word === array.id;
      }
    });

    if (!findWordOnIds) {
      ids.push({ id: word, line: ids.length + 1 });
      return { token: `<id,${ids.length}>`, end };
    } else {
      return { token: `<id,${findWordOnIds.line}>`, end };
    }
  }
};
