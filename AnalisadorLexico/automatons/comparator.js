const { isDigit, isLetter, isSpace } = require("../util/util");

module.exports.comparatorAutomaton = (code, position) => {
  const nextIsValid = (i) => {
    return isDigit(code[i]) || isLetter(code[i]) || isSpace(code[i]);
  };

  const result = (pos, relacao) => {
    return { end: pos, token: `<relação,${relacao}>` };
  };

  const lessThan = () => {
    if (code[position + 1] == "=") {
      if (nextIsValid(position + 2)) return result(position + 1, "MEI");
      else throw `Comparação inválida. Posição ${position}`;
    } else {
      if (code[position + 1] == ">") {
        if (nextIsValid()) return result(position + 1, "D");
        else throw `Comparação inválida. Posição ${position}`;
      } else {
        if (nextIsValid(position + 1)) return result(position, "MEQ");
        else throw `Comparação inválida. Posição ${position}`;
      }
    }
  };

  const biggerThan = () => {
    if (code[position + 1] == "=") {
      if (nextIsValid()) return result(position + 1, "MAI");
      else throw `Comparação inválida. Posição ${position}`;
    } else {
      if (nextIsValid()) return result(position, "MAQ");
      else throw `Comparação inválida. Posição ${position}`;
    }
  };

  const equal = () => {
    if (code[position + 1] == "=") {
      if (nextIsValid()) return result(position + 1, "I");
      else throw `Comparação inválida. Posição ${position}`;
    }
  };

  switch (code[position]) {
    case ">":
      return biggerThan();
    case "<":
      return lessThan();
    case "=":
      return equal();
  }
};
