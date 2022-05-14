const { comparatorAutomaton } = require("../../../automatons/comparator");

describe("Automato comparador", () => {
  it("Deve receber '< ' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("< ", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
  });

  it("Deve receber '<' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
  });

  it("Deve receber '<1 ' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<1", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
  });

  it("Deve receber '<A' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<A", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
  });

  it("Deve receber '<&' e retornar um erro", () => {
    expect(() => {
      numberAutomaton("<&", 0);
    }).toThrow();
  });

  it("Deve receber '<=' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<=", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
  });

  it("Deve receber '<= ' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<= ", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
  });

  it("Deve receber '<=A' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<=A", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
  });

  it("Deve receber '<=1' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<=1", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
  });

  it("Deve receber '<=_' e retornar um erro", () => {
    expect(() => {
      numberAutomaton("<=_", 0);
    }).toThrow();
  });

  it("Deve receber '<>' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<>", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
  });

  it("Deve receber '<> ' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<> ", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
  });

  it("Deve receber '<>2' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<>2", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
  });

  it("Deve receber '<>a' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("<>a", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
  });

  it("Deve receber '<>_' e retornar um erro", () => {
    expect(() => {
      numberAutomaton("<>_", 0);
    }).toThrow();
  });

  it("Deve receber '> ' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton("> ", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
  });

  it("Deve receber '>' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton(">", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
  });

  it("Deve receber '>2' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton(">2", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
  });

  it("Deve receber '>a' e retornar o token e a posição final", () => {
    const res = comparatorAutomaton(">a", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
  });

  it("Deve receber '>_' e retornar um erro", () => {
    expect(() => {
      numberAutomaton(">_", 0);
    }).toThrow();
  });
});
