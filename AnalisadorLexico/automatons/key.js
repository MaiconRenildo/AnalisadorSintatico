const { isEndKey } = require("../util/util");

module.exports.keyAutomaton = (code, position) => {

  for (let i = position + 1; i < code.length; i++) {
    if (isEndKey(code[i])) {
      return { end: i, token:null };
    }
  }
  
  throw `Um comentário começa e termina com chaves. Posição inicial do comentário:${position}`;
};
