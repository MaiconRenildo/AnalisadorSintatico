const { keyAutomaton } = require("../../../automatons/key");

describe("Key Automaton", () => {

  it('Deve receber "{    }" e retornar o token e a posição final', () => {
    const res = keyAutomaton(`{    }`, 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.token).toEqual(null);
    expect(res.end).toEqual(5);
  });

  it('Deve receber "{any}" e retornar o token e a posição final', () => {
    const res = keyAutomaton(`{any}`, 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.token).toEqual(null);
    expect(res.end).toEqual(4);
  });

  it('Deve receber "{{{}" e retornar o token e a posição final', () => {
    const res = keyAutomaton(`{{{}`, 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.token).toEqual(null);
    expect(res.end).toEqual(3);
  });

  it('Deve receber "{  " e retornar um erro', () => {
    const res = 
    expect(() => {
      keyAutomaton(`{  `, 0);
    }).toThrow();
  });

});
