const isDigit = (character) => {
  const digits = "0123456789";
  return digits.indexOf(character) == -1 ? false : true;
};

const isLetter = (character) => {

  if(character=="_"){
    return true;
  }else{
    const reg = /[a-zA-Z]/;
    return reg.test(character);
  }

};

const isString = (character) => {
  return character == `"` ? true : false;
};

const isComparison = (character) => {
  const comparators = "><=!";
  return comparators.indexOf(character) == -1 ? false : true;
};

const isAssigment = (character) => {
  return character === ":" ? true : false;
};

const isPunctuation = (character) => {
  const punctuations = "();,.";
  return punctuations.indexOf(character) == -1 ? false : true;
};

const isStartKey = (character) => {
  return character=="{" ? true :false;
}

const isEndKey = (character) => {
  return character=="}" ? true :false;
}

const isParentheses = (character) => {
  return character === "(" || character === ")" ? true : false;
};

const isSpace = (character) => {
  return character === " " || character === "\n" ? true : false;
};

const isOperator = (character) => {
  const operators = "+-/*";
  return operators.indexOf(character) == -1 ? false : true;
};

const isSumOrSub = (character) => {
  return character == "+" || character == "-" ? true : false;
};

const isDot = (character) =>{
  return character == "." ? true :false;
}

const isEndOfNumber = (character) => {
  return isComparison(character) ||
    isOperator(character) ||
    isParentheses(character) ||
    isSpace(character) ||
    isAssigment(character) ||
    character == ";" ||
    character == ","
    ? true
    : false;
};
module.exports = {
  isDot,
  isDigit,
  isSpace,
  isLetter,
  isString,
  isEndKey,
  isOperator,
  isStartKey,
  isSumOrSub,
  isAssigment,
  isComparison,
  isEndOfNumber,
  isPunctuation,
  isParentheses,
};
