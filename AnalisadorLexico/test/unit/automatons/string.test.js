const { stringAutomaton } = require("../../../automatons/string");

describe("String Automaton", () => {
  it('Deve receber "" e retornar o token e a posição final', () => {
    const res = stringAutomaton(`""`, 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
  });

  it('Deve receber "1" e retornar o token e a posição final', () => {
    const res = stringAutomaton(`"1"`, 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(2);
  });

  it('Deve receber "12" e retornar o token e a posição final', () => {
    const res = stringAutomaton(`"12"`, 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(3);
  });

  it('Deve receber "abc" e retornar o token e a posição final', () => {
    const res = stringAutomaton(`"abc"`, 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(4);
  });

  it(`Deve receber 'a' e retornar um erro`, () => {
    expect(() => {
      stringAutomaton("a", 0);
    }).toThrow();
  });

  it(`Deve receber '' e retornar um erro`, () => {
    expect(() => {
      stringAutomaton("", 0);
    }).toThrow();
  });

  it(`Deve receber '"a ' e retornar um erro`, () => {
    expect(() => {
      stringAutomaton(`"a`, 0);
    }).toThrow();
  });
});
