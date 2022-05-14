const { numberAutomaton } = require("../../../automatons/number");

describe("Number Automaton", () => {
  describe("Inteiros", () => {
    it("Deve receber '0' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '2' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '2(' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2(", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '2)' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2)", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");

      expect(res.end).toEqual(0);
    });

    it("Deve receber '-2' e retornar o token e a posição final", () => {
      const res = numberAutomaton("-2", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,-2>");
      expect(res.end).toEqual(1);
    });

    it("Deve receber '+2' e retornar o token e a posição final", () => {
      const res = numberAutomaton("+2", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,+2>");
      expect(res.end).toEqual(1);
    });

    it("Deve receber '2+' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2+", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '2-' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2-", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '2/' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2/", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '2*' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2*", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '2=' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2=", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '2<' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2<", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '2>' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2>", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '2 ' e retornar o token e a posição final", () => {
      const res = numberAutomaton("2 ", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,2>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '0+' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0+", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '0-' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0-", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '0/' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0/", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '0*' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0*", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '0=' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0=", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '0<' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0<", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '0>' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0>", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '0=' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0=", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '0 ' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0 ", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0>");
      expect(res.end).toEqual(0);
    });

    it("Deve receber '12' e retornar o token e a posição final", () => {
      const res = numberAutomaton("12", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,12>");
      expect(res.end).toEqual(1);
    });

    it("Deve receber '12>' e retornar o token e a posição final", () => {
      const res = numberAutomaton("12>", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,12>");
      expect(res.end).toEqual(1);
    });

    it("Deve receber '12+' e retornar o token e a posição final", () => {
      const res = numberAutomaton("12+", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,12>");
      expect(res.end).toEqual(1);
    });

    it("Deve receber '12 ' e retornar o token e a posição final", () => {
      const res = numberAutomaton("12 ", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,12>");
      expect(res.end).toEqual(1);
    });

    it("Deve receber '123' e retornar o token e a posição final", () => {
      const res = numberAutomaton("123", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,123>");
      expect(res.end).toEqual(2);
    });

    it("Deve receber '123+' e retornar o token e a posição final", () => {
      const res = numberAutomaton("123+", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,123>");
      expect(res.end).toEqual(2);
    });

    it("Deve receber '1234' e retornar o token e a posição final", () => {
      const res = numberAutomaton("1234", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,1234>");
      expect(res.end).toEqual(3);
    });

    it("Deve receber '1234 ' e retornar o token e a posição final", () => {
      const res = numberAutomaton("1234 ", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,1234>");
      expect(res.end).toEqual(3);
    });

    it("Deve receber '1234>' e retornar o token e a posição final", () => {
      const res = numberAutomaton("1234>", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,1234>");
      expect(res.end).toEqual(3);
    });

    it("Deve receber '1234+' e retornar o token e a posição final", () => {
      const res = numberAutomaton("1234+", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,1234>");
      expect(res.end).toEqual(3);
    });
  });

  describe("Decimais", () => {
    it("Deve receber '1.0' e retornar o token e a posição final", () => {
      const res = numberAutomaton("1.0", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,1.0>");
      expect(res.end).toEqual(2);
    });

    it("Deve receber '0.0' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0.0", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0.0>");
      expect(res.end).toEqual(2);
    });

    it("Deve receber '0.1' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0.1", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0.1>");
      expect(res.end).toEqual(2);
    });

    it("Deve receber '0.1>' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0.1>", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0.1>");
      expect(res.end).toEqual(2);
    });

    it("Deve receber '0.1+' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0.1+", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0.1>");
      expect(res.end).toEqual(2);
    });

    it("Deve receber '0.1 ' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0.1 ", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0.1>");
      expect(res.end).toEqual(2);
    });

    it("Deve receber '0.12' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0.12", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0.12>");
      expect(res.end).toEqual(3);
    });

    it("Deve receber '0.12>' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0.12>", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0.12>");
      expect(res.end).toEqual(3);
    });

    it("Deve receber '0.122' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0.122", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0.122>");
      expect(res.end).toEqual(4);
    });

    it("Deve receber '0.122 ' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0.122 ", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0.122>");
      expect(res.end).toEqual(4);
    });

    it("Deve receber '1.12' e retornar o token e a posição final", () => {
      const res = numberAutomaton("1.12", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,1.12>");
      expect(res.end).toEqual(3);
    });

    it("Deve receber '1.123' e retornar o token e a posição final", () => {
      const res = numberAutomaton("1.123", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,1.123>");
      expect(res.end).toEqual(4);
    });

    it("Deve receber '12.1' e retornar o token e a posição final", () => {
      const res = numberAutomaton("12.1", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,12.1>");
      expect(res.end).toEqual(3);
    });

    it("Deve receber '12.1<' e retornar o token e a posição final", () => {
      const res = numberAutomaton("12.1<", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,12.1>");
      expect(res.end).toEqual(3);
    });

    it("Deve receber '12.32' e retornar o token e a posição final", () => {
      const res = numberAutomaton("12.32", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,12.32>");
      expect(res.end).toEqual(4);
    });

    it("Deve receber 125.4 e retornar o token e a posição final", () => {
      const res = numberAutomaton("125.4", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,125.4>");
      expect(res.end).toEqual(4);
    });

    it("Deve receber '125.424' e retornar o token e a posição final", () => {
      const res = numberAutomaton("125.424", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,125.424>");
      expect(res.end).toEqual(6);
    });

    it("Deve receber '0.425' e retornar o token e a posição final", () => {
      const res = numberAutomaton("0.425", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.token).toEqual("<num,0.425>");
      expect(res.end).toEqual(4);
    });

    it("Deve receber '-0.425' e retornar o token e a posição final", () => {
      const res = numberAutomaton("-0.425", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.end).toEqual(5);
    });

    it("Deve receber '+0.425' e retornar o token e a posição final", () => {
      const res = numberAutomaton("+0.425", 0);
      expect(res).toHaveProperty("end");
      expect(res).toHaveProperty("token");
      expect(res.end).toEqual(5);
    });
  });

  describe("Casos de error", () => {
    it("Deve receber 'a' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("a", 0);
      }).toThrow();
    });

    it("Deve receber '+' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("+", 0);
      }).toThrow();
    });

    it("Deve receber '/' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("/", 0);
      }).toThrow();
    });

    it("Deve receber '00' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("00", 0);
      }).toThrow();
    });

    it("Deve receber '-00' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("-00", 0);
      }).toThrow();
    });

    it("Deve receber '2a' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("2a", 0);
      }).toThrow();
    });

    it("Deve receber '23b' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("23b", 0);
      }).toThrow();
    });

    it("Deve receber '234b' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("234b", 0);
      }).toThrow();
    });

    it("Deve receber '2345b' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("2345b", 0);
      }).toThrow();
    });

    it("Deve receber '0.' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("0.", 0);
      }).toThrow();
    });

    it("Deve receber '0. ' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("0. ", 0);
      }).toThrow();
    });

    it("Deve receber '0.+' e retornar um erro", () => {
      expect(() => {
        numberAutomaton("0.+", 0);
      }).toThrow();
    });
  });
});
