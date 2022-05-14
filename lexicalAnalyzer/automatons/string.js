module.exports.stringAutomaton = (code, position) => {
  let token = `<string,${code[position]}`;

  for (let i = position + 1; i < code.length; i++) {
    token = token + code[i];
    if (code[i] === `"`) {
      token = token + ">";
      return { end: i, token };
    }
  }

  throw `Uma string começa e termina com aspas. Posição inicial da string:${position}`;
};
