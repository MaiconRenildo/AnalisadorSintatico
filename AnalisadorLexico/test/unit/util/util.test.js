const {
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
} = require("../../../util/util");

describe("util\n", () => {
  describe("isDigit", () => {
    it('Deve receber "2" e retornar true', () => {
      const res = isDigit("2");
      expect(res).toEqual(true);
    });

    it('Deve receber "a" e retornar false', () => {
      const res = isDigit("a");
      expect(res).toEqual(false);
    });

    it('Deve receber ";" e retornar false', () => {
      const res = isDigit(";");
      expect(res).toEqual(false);
    });
  });

  describe("isSpace", () => {
    it('Deve receber " " e retornar true', () => {
      const res = isSpace(" ");
      expect(res).toEqual(true);
    });

    it('Deve receber "\\n" e retornar true', () => {
      const res = isSpace("\n");
      expect(res).toEqual(true);
    });

    it('Deve receber "a" e retornar false', () => {
      const res = isSpace("a");
      expect(res).toEqual(false);
    });

    it('Deve receber "2" e retornar false', () => {
      const res = isSpace("2");
      expect(res).toEqual(false);
    });
  });

  describe("isLetter", () => {

    it('Deve receber "_" e retornar true', () => {
      const res = isLetter("_");
      expect(res).toEqual(true);
    });

    it('Deve receber "2" e retornar false', () => {
      const res = isLetter("2");
      expect(res).toEqual(false);
    });

    it('Deve receber ";" e retornar false', () => {
      const res = isLetter(";");
      expect(res).toEqual(false);
    });

    it('Deve receber "a" e retornar true', () => {
      const res = isLetter("a");
      expect(res).toEqual(true);
    });

    it('Deve receber "z" e retornar true', () => {
      const res = isLetter("z");
      expect(res).toEqual(true);
    });

    it('Deve receber "A" e retornar true', () => {
      const res = isLetter("A");
      expect(res).toEqual(true);
    });

    it('Deve receber "Z" e retornar true', () => {
      const res = isLetter("Z");
      expect(res).toEqual(true);
    });
  });

  describe("isString", () => {
    it('Deve receber `"` e retornar true', () => {
      const res = isString(`"`);
      expect(res).toEqual(true);
    });

    it('Deve receber "a"  e retornar false', () => {
      const res = isString(`a`);
      expect(res).toEqual(false);
    });

    it('Deve receber "2"  e retornar false', () => {
      const res = isString(`2`);
      expect(res).toEqual(false);
    });
  });

  describe("isSumOrSub", () => {
    it('Deve receber "+" e retornar true', () => {
      const res = isSumOrSub("+");
      expect(res).toEqual(true);
    });

    it('Deve receber "-" e retornar true', () => {
      const res = isSumOrSub("-");
      expect(res).toEqual(true);
    });

    it('Deve receber "*" e retornar false', () => {
      const res = isSumOrSub("*");
      expect(res).toEqual(false);
    });
  });

  describe("isOperator", () => {
    it('Deve receber "+" e retornar true', () => {
      const res = isOperator("+");
      expect(res).toEqual(true);
    });

    it('Deve receber "-" e retornar true', () => {
      const res = isOperator("-");
      expect(res).toEqual(true);
    });

    it('Deve receber "/" e retornar true', () => {
      const res = isOperator("/");
      expect(res).toEqual(true);
    });

    it('Deve receber "*" e retornar true', () => {
      const res = isOperator("*");
      expect(res).toEqual(true);
    });

    it('Deve receber "2" e retornar false', () => {
      const res = isOperator("2");
      expect(res).toEqual(false);
    });

    it('Deve receber "a" e retornar false', () => {
      const res = isOperator("a");
      expect(res).toEqual(false);
    });
  });

  describe("isComparison", () => {
    it('Deve receber ">" e retornar true', () => {
      const res = isComparison(">");
      expect(res).toEqual(true);
    });

    it('Deve receber "<" e retornar true', () => {
      const res = isComparison("<");
      expect(res).toEqual(true);
    });

    it('Deve receber "=" e retornar true', () => {
      const res = isComparison("=");
      expect(res).toEqual(true);
    });

    it('Deve receber "2" e retornar false', () => {
      const res = isComparison("2");
      expect(res).toEqual(false);
    });

    it('Deve receber "a" e retornar false', () => {
      const res = isComparison("a");
      expect(res).toEqual(false);
    });
  });

  describe("isEndOfNumber", () => {
    it('Deve receber "+" e retornar true', () => {
      const res = isEndOfNumber("+");
      expect(res).toEqual(true);
    });

    it('Deve receber "-" e retornar true', () => {
      const res = isEndOfNumber("+");
      expect(res).toEqual(true);
    });

    it('Deve receber "*" e retornar true', () => {
      const res = isEndOfNumber("*");
      expect(res).toEqual(true);
    });

    it('Deve receber "/" e retornar true', () => {
      const res = isEndOfNumber("/");
      expect(res).toEqual(true);
    });

    it('Deve receber "(" e retornar true', () => {
      const res = isEndOfNumber("(");
      expect(res).toEqual(true);
    });

    it('Deve receber ")" e retornar true', () => {
      const res = isEndOfNumber(")");
      expect(res).toEqual(true);
    });

    it('Deve receber " " e retornar true', () => {
      const res = isEndOfNumber(" ");
      expect(res).toEqual(true);
    });

    it('Deve receber "\\n" e retornar true', () => {
      const res = isEndOfNumber("\n");
      expect(res).toEqual(true);
    });

    it('Deve receber ":" e retornar true', () => {
      const res = isEndOfNumber(":");
      expect(res).toEqual(true);
    });

    it('Deve receber ";" e retornar true', () => {
      const res = isEndOfNumber(";");
      expect(res).toEqual(true);
    });

    it('Deve receber "," e retornar true', () => {
      const res = isEndOfNumber(",");
      expect(res).toEqual(true);
    });
  });

  describe("isAssigment", () => {
    it('Deve receber ":" e retornar true', () => {
      const res = isAssigment(":");
      expect(res).toEqual(true);
    });

    it('Deve receber "=" e retornar false', () => {
      const res = isAssigment("=");
      expect(res).toEqual(false);
    });

    it('Deve receber "a" e retornar false', () => {
      const res = isAssigment("a");
      expect(res).toEqual(false);
    });

    it('Deve receber "2" e retornar false', () => {
      const res = isAssigment("2");
      expect(res).toEqual(false);
    });
  });

  describe("isPunctuations", () => {
    it('Deve receber ";" e retornar true', () => {
      const res = isPunctuation(";");
      expect(res).toEqual(true);
    });

    it('Deve receber "," e retornar true', () => {
      const res = isPunctuation(",");
      expect(res).toEqual(true);
    });

    it('Deve receber "." e retornar true', () => {
      const res = isPunctuation(".");
      expect(res).toEqual(true);
    });

    it('Deve receber "(" e retornar true', () => {
      const res = isPunctuation("(");
      expect(res).toEqual(true);
    });

    it('Deve receber ")" e retornar true', () => {
      const res = isPunctuation(")");
      expect(res).toEqual(true);
    });

    it('Deve receber "a" e retornar false', () => {
      const res = isPunctuation("a");
      expect(res).toEqual(false);
    });

    it('Deve receber "2" e retornar false', () => {
      const res = isPunctuation("2");
      expect(res).toEqual(false);
    });
  });

  describe("isParentheses", () => {
    it('Deve receber ")" e retornar true', () => {
      const res = isParentheses(")");
      expect(res).toEqual(true);
    });

    it('Deve receber "(" e retornar true', () => {
      const res = isParentheses("(");
      expect(res).toEqual(true);
    });

    it('Deve receber ";" e retornar false', () => {
      const res = isParentheses(";");
      expect(res).toEqual(false);
    });
  });

  describe("isStartKey",()=>{

    it("Deve receber `{` e retornar true",()=>{
      const res = isStartKey("{");
      expect(res).toEqual(true)
    });

  });

  describe("isEndKey",()=>{

    it("Deve receber `{` e retornar true",()=>{
      const res = isEndKey("}");
      expect(res).toEqual(true)
    });
    
  })
});
