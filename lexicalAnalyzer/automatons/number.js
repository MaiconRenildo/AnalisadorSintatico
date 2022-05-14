const { isDot, isDigit, isSumOrSub, isEndOfNumber } = require("../util/util");

module.exports.numberAutomaton = (code, position) => {
  let token;

  const startOftoken = () => {
    token = `<num,${code[position]}`;
  };

  const incrementToken = (i) => {
    token = token + `${code[i]}`;
  };

  const endOftoken = () => {
    token = token + `>`;
  };

  const isEndOfCode = (i) => {
    return i > code.length - 1 ? true : false;
  };

  const qErro = (erro) => {
    throw erro;
  };

  const q0 = (position) => {
    if (isSumOrSub(code[position])) {
      startOftoken();
      position++;

      if (!isDigit(code[position]))
        return qErro("Número inválido. Posição: " + position);

      incrementToken(position);

      return code[position] == 0 ? q01(position + 1) : q1(position + 1);
    } else {
      if (!isDigit(code[position]))
        return qErro("Número inválido. Posição: " + position);

      startOftoken();

      return code[position] == 0 ? q01(position + 1) : q1(position + 1);
    }
  };

  const q01 = (position) => {
    if (isEndOfCode(position)) {
      endOftoken();
      return position - 1;
    }

    if (isEndOfNumber(code[position])) {
      endOftoken();
      return position - 1;
    }

    if (!isDigit(code[position])) {
      if (isDot(code[position])) {
        incrementToken(position);
        return q2(position + 1);
      } else {
        return qErro("Número inválido. Posição: " + position);
      }
    } else {
      return qErro("Número inválido. Posição: " + position);
    }
  };

  const q1 = (position) => {
    if (isEndOfCode(position)) {
      endOftoken();
      return position - 1;
    }

    if (isEndOfNumber(code[position])) {
      endOftoken();
      return position - 1;
    }

    if (isDot(code[position])) {
      incrementToken(position);
      return q2(position + 1);
    }

    if (isDigit(code[position])) {
      incrementToken(position);
      return q1(position + 1);
    }

    return qErro("Número inválido. Posição: " + position);
  };

  const q2 = (position) => {
    if (isEndOfNumber(code[position])) {
      return qErro("Número inválido. Posição: " + position);
    }

    if (!isDigit(code[position])) {
      return qErro("Número inválido. Posição: " + position);
    } else {
      incrementToken(position);
      return q3(position + 1);
    }
  };

  const q3 = (position) => {
    if (isEndOfCode(position)) {
      endOftoken();
      return position - 1;
    }

    if (isEndOfNumber(code[position])) {
      endOftoken();
      return position - 1;
    }

    if (isDot(code[position])) {
      return qErro("Número inválido. Posição: " + position);
    }

    if (!isDigit(code[position])) {
      return qErro("Número inválido. Posição: " + position);
    } else {
      incrementToken(position);
      return q3(position + 1);
    }
  };

  const end = q0(position);
  return { end, token };
};
