const { letterAutomaton } = require("../../../automatons/letter");

describe("Automato palavra reservada ou id", () => {
  const reservedWords = [
    "program",
    "var",
    "int",
    "float",
    "begin",
    "do",
    "while",
    "then",
    "if",
    "else",
    "end",
    "read",
    "write",
    "not",
    "div",
    "and",
    "procedure",
    "true",
    "false",
  ];

  it("Deve receber 'Program' e retornar o token e a posição final", () => {
    const ids = [];
    const res = letterAutomaton("Program", 0, reservedWords, ids);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.token).toEqual("<id,1>");
    expect(ids[0]).toHaveProperty("line");
    expect(ids[0]).toHaveProperty("id");
    expect(ids[0].id).toEqual("Program");
  });

  it("Deve receber 'any' e retornar o token e a posição final", () => {
    const ids = [{ id: "any", line: 1 }];
    const res = letterAutomaton("any", 0, reservedWords, ids);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.token).toEqual("<id,1>");
    expect(ids[0]).toHaveProperty("line");
    expect(ids[0]).toHaveProperty("id");
    expect(ids[0].id).toEqual("any");
  });

  it("Deve receber 'true' e retornar o token e a posição final", () => {
    const ids = [];
    const res = letterAutomaton("true", 0, reservedWords, ids);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(3);
    expect(res.token).toEqual("<true,>");
  });

  it("Deve receber 'true ' e retornar o token e a posição final", () => {
    const ids = [];
    const res = letterAutomaton("true ", 0, reservedWords, ids);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(3);
    expect(res.token).toEqual("<true,>");
  });

  it("Deve receber 'true&' e retornar um erro", () => {
    expect(() => {
      numberAutomaton("true&", 0);
    }).toThrow();
  });
});
