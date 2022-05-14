const { operatorAutomaton } = require("../../../automatons/operator");

describe("Operator Automaton", () => {
  it("Deve receber '+1' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("+1", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    // expect(res.end).toEqual(1);
    // expect(res.token).toEqual("<num,+1>");
    expect(res.end).toEqual(0);
    expect(res.token).toEqual("<operador,+>");
  });

  it("Deve receber '*1' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("*1", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
    expect(res.token).toEqual("<operador,*>");
  });

  it("Deve receber '/1' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("/1", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
    expect(res.token).toEqual("<operador,/>");
  });

  it("Deve receber '//  \n' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton('//  \n', 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(4);
    expect(res.token).toEqual(null);
  });

  it("Deve receber '=+1' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("=+1", 1);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    // expect(res.end).toEqual(2);
    // expect(res.token).toEqual("<num,+1>");
    expect(res.end).toEqual(1);
    expect(res.token).toEqual("<operador,+>");
  });

  it("Deve receber '(+1' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("(+1", 1);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    // expect(res.end).toEqual(2);
    // expect(res.token).toEqual("<num,+1>");
    expect(res.end).toEqual(1);
    expect(res.token).toEqual("<operador,+>");
  });

  it("Deve receber '2+1' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("2+1", 1);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
    expect(res.token).toEqual("<operador,+>");
  });

  it("Deve receber '2-1' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("2-1", 1);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
    expect(res.token).toEqual("<operador,->");
  });

  it("Deve receber '2*1' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("2*1", 1);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
    expect(res.token).toEqual("<operador,*>");
  });

  it("Deve receber '2/1' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("2/1", 1);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
    expect(res.token).toEqual("<operador,/>");
  });

  it("Deve receber '+any' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("+any", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
    expect(res.token).toEqual("<operador,+>");
  });

  it("Deve receber '*any' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton("*any", 0);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(0);
    expect(res.token).toEqual("<operador,*>");
  });

  it("Deve receber ' -any' e retornar o token e a posição final ", () => {
    const res = operatorAutomaton(" -any", 1);
    expect(res).toHaveProperty("end");
    expect(res).toHaveProperty("token");
    expect(res.end).toEqual(1);
    expect(res.token).toEqual("<operador,->");
  });
});
