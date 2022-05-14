require("dotenv").config();
const {fileReader} = require("../fileReader")
const path = `./files/${process.env.FILE_NAME}`;
const {
  isDigit,
  isSpace,
  isLetter,
  isString,
  isStartKey,
  isOperator,
  isAssigment,
  isComparison,
  isPunctuation,
} = require("./util/util");

const { keyAutomaton } =require("./automatons/key");
const { numberAutomaton } = require("./automatons/number");
const { stringAutomaton } = require("./automatons/string");
const { letterAutomaton } = require("./automatons/letter");
const { operatorAutomaton } = require("./automatons/operator");
const { comparatorAutomaton } = require("./automatons/comparator");

const lexicalAnalyzer = async () => {
  const code = await fileReader(path);

  const ids = [];
  const reservedWords = ["program","var","int","float","begin","do","while","then","if","else","end","read","write","not","div","and","procedure","true","false"];
  const tokens = [];

  const addtoken = (token) => {
    if(token){
      tokens.push(token);
    }
  };

  const analyze = (i) => {

    if (i < code.length) {

      if (isSpace(code[i])) {
        return analyze(i + 1);

      }else if(isOperator(code[i])){
        const { token, end } = operatorAutomaton(code,i);
        addtoken(token);
        return analyze(end + 1);

      } else if (isDigit(code[i])) {
        const { token, end } = numberAutomaton(code, i);
        addtoken(token);
        return analyze(end + 1);
        
      } else if (isComparison(code[i])) {
        const { token, end } = comparatorAutomaton(code, i);
        addtoken(token);
        return analyze(end + 1);

      } else if (isString(code[i])) {
        const { token, end } = stringAutomaton(code, i);
        addtoken(token);
        return analyze(end + 1);

      } else if (isAssigment(code[i])) {

        if (code[i + 1] == "=") {
          addtoken(`<${code[i]}${code[i + 1]},>`);
          return analyze(i + 2);
        } else {
          throw `Caracter inválido.Posição: ${code[i + 1]}`;
        }

      } else if (isPunctuation(code[i])) {
        addtoken(`<${code[i]},>`);
        if (code[i] == ".") return;
        else return analyze(i + 1);

      } else if (isLetter(code[i])) {
        const { token, end } = letterAutomaton(code, i, reservedWords, ids);
        addtoken(token);
        analyze(end + 1);

      } else if(isStartKey(code[i])){
        const { end } = keyAutomaton(code, i, reservedWords, ids);
        analyze(end + 1);
        
      }  else {
        throw `Caracter inválido.Posição: ${code[i]}`;
      }

    } else {
      return;
    }

  };

  analyze(0);
  
  return {
    tokens,
    ids
  };

};

module.exports = lexicalAnalyzer