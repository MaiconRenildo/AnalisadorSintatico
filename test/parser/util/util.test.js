const { deleteUnexpectedTokens, getToken, afterIntOrFloat, readProgram, afterVar,readEnd } = require("../../../util/util");

describe("util\n", () => {
  tokens = ["<program,>", "<operador,/>", "<id,1>", "<;,>", "<int,>"];

  describe("eliminateTokens", () => {
    it("Deve receber eliminar os tokens até encontrar um ponto e vírgula", () => {
      tokens = ["<program,>", "<operador,/>", "<id,1>", "<;,>", "<int,>"];
      index = 0;
      sinc = [";"];
      expect(deleteUnexpectedTokens(tokens, index, sinc)).toEqual([
        "<;,>",
        "<int,>",
      ]);
    });

    it("Deve receber eliminar os tokens até encontrar um int", () => {
      tokens = ["<program,>", "<operador,/>", "<id,1>", "<;,>", "<int,>"];
      index = 0;
      sinc = ["int"];
      expect(deleteUnexpectedTokens(tokens, index, sinc)).toEqual(["<int,>"]);
    });

    it("Deve receber eliminar os tokens até encontrar um id", () => {
      tokens = ["<program,>", "<operador,/>", "<id,1>", "<;,>", "<int,>"];
      index = 0;
      sinc = ["id"];
      expect(deleteUnexpectedTokens(tokens, index, sinc)).toEqual([
        "<id,1>",
        "<;,>",
        "<int,>",
      ]);
    });

    it("Deve receber eliminar os tokens até encontrar um operador ou int", () => {
      tokens = ["<program,>", "<operador,/>", "<id,1>", "<;,>", "<int,>"];
      index = 0;
      sinc = ["operador", "int"];
      expect(deleteUnexpectedTokens(tokens, index, sinc)).toEqual([
        "<operador,/>",
        "<id,1>",
        "<;,>",
        "<int,>",
      ]);
    });

    it("Deve chamar a função que imprime um erro", () => {
      tokens = ["<program,>", "<operador,/>", "<id,1>", "<;,>", "<int,>"];
      index = 0;
      sinc = ["end","fim"];
      console.log = jest.fn()
      deleteUnexpectedTokens(tokens, index, sinc)
      expect(console.log.mock.calls[0][0]).toBe("Erro na compilação. Esperava-se um desses tokens -> (end,fim)");
    });

  });

  describe("getToken", () => {
    it("Deve pegar o nome do token", () => {
      expect(getToken("<program,>")).toEqual("program");
      expect(getToken("<operador,+>")).toEqual("operador");
      expect(getToken("<var,>")).toEqual("var");
      expect(getToken("<relação,MEQ>")).toEqual("relação");
      expect(getToken("<num,1>")).toEqual("num");
      expect(getToken("<end,>")).toEqual("end");
      expect(getToken("<then,>")).toEqual("then");
      expect(getToken("<;,>")).toEqual(";");
      expect(getToken("<,,>")).toEqual(",");
    });
  });


  describe("afterIntOrFloat",() => {

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });

    it("Deve ler um  array com a sequência 'int id ;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<int,>",
        "<id,1>",
        "<;,>",
        "<end,>"
      ]
      afterIntOrFloat(tokens,1)
      expect(console.log).not.toHaveBeenCalled()
    })

    it("Deve ler um  array com a sequência 'int id,id,id;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<int,>",
        "<id,1>",
        "<,,>",
        "<id,1>",
        "<,,>",
        "<id,1>",
        "<;,>",
        "<end,>"
      ]
      afterIntOrFloat(tokens,1)
      expect(console.log).not.toHaveBeenCalled()
    })


    it("Deve ler um array com a sequência 'int id id;' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<int,>",
        "<id,1>",
        "<id,1>",
        "<;,>",
        "<end,>",
        "<end,>"
      ]
      afterIntOrFloat(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("Após um id deve haver um desses elementos -> (';',':=',','");
    })

    it("Deve ler um array com a sequência 'id' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<int,>",
        "<id,1>",
      ]
      afterIntOrFloat(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("Fim inesperado após a leitura de um id");
    })


    it("Deve ler um array com a sequência 'int' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<int,>",
      ]
      afterIntOrFloat(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("Fim inesperado após a leitura de um int/float");
    })
    
  })
  

  describe("readProgram",()=>{

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });


    it("Deve ler um  array com a sequência 'Program id ; ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<program,>",
        "<id,1>",
        "<;,>",
        "<end,>"
      ]
      readProgram(tokens)
      expect(console.log).not.toHaveBeenCalled()
    })


    it("Deve ler um array com a sequência 'id program id;' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<id,1>",
        "<program,>",
        "<id,1>",
        "<;,>",
        "<end,>"
      ]
      readProgram(tokens)
      expect(console.log.mock.calls[0][0]).toBe("A primeira coisa a ser informada no programa deve ser o nome dele");
    })

    it("Deve ler um array com a sequência 'program program id;' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<program,>",
        "<program,>",
        "<id,1>",
        "<;,>",
        "<end,>"
      ]
      readProgram(tokens)
      expect(console.log.mock.calls[0][0]).toBe("É esperado um id após o 'program'");
    })



    it("Deve ler um array com a sequência 'program id id;' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<program,>",
        "<id,1>",
        "<id,2>",
        "<;,>",
        "<end,>"
      ]
      readProgram(tokens)
      expect(console.log.mock.calls[0][0]).toBe("É necessário finalizar a declaração do nome do programa com ';'");
    })

  })


  describe("afterVar",() => {

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });

    it("Deve ler um  array com a sequência 'var id := string;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<var,>",
        "<id,1>",
        "<:=,>",
        "<string,'caramelo'>",
        "<;,>",
        "<end,>"
      ]
      afterVar(tokens,1)
      expect(console.log).not.toHaveBeenCalled()
    })

    it("Deve ler um  array com a sequência 'var id,id,id;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<var,>",
        "<id,1>",
        "<,,>",
        "<id,2>",
        "<,,>",
        "<id,3>",
        "<;,>",
        "<end,>"
      ]
      afterVar(tokens,1)
      expect(console.log).not.toHaveBeenCalled()
    })


    it("Deve ler um array com a sequência 'var id := id;' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<var,>",
        "<id,1>",
        "<:=,>",
        "<id,2>",
        "<string,'caramelo'>",
        "<;,>",
        "<end,>"
      ]
      afterVar(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("A um var só é possível atribuir strings");
    })

    it("Deve ler um array com a sequência 'var id := string, ; end' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<var,>",
        "<id,1>",
        "<:=,>",
        "<string,'caramelo'>",
        "<,>",
        "<;,>",
        "<end,>"
      ]
      afterVar(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("É necessário o uso do ';' após a atribuição de um var");
    })


    it("Deve ler um array com a sequência 'var id :=' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<var,>",
        "<id,1>",
        "<:=,>",
      ]
      afterVar(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("Fim inesperado após a leitura de um ':='");
    })


    it("Deve ler um array com a sequência 'var id := string' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<var,>",
        "<id,1>",
        "<:=,>",
        "<string,'caramelo'>",
      ]
      afterVar(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("Fim inesperado após a leitura de uma string");
    })

    
  })
  

  describe("readEnd",()=>{

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });


    it("Deve ler um  array com a sequência 'begin id := 2 end' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<begin,>",
        "<id,1>",
        "<:=,>",
        "<num,2>",
        "<end,>"
      ]

      readEnd(tokens,4)
      expect(console.log).not.toHaveBeenCalled()
    })


    it("Deve ler um  array com a sequência 'id := 2 end.' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<id,1>",
        "<:=,>",
        "<num,2>",
        "<end,>",
        "<.,>"
      ]

      readEnd(tokens,3)
      expect(console.log).not.toHaveBeenCalled()
    })

    it("Deve ler um  array com a sequência 'id := 2 end id' e retornar erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<id,1>",
        "<:=,>",
        "<num,2>",
        "<end,>",
        "<id,2,>"
      ]

      readEnd(tokens,3)
      expect(console.log.mock.calls[0][0]).toBe("Um end inesperado foi recebido");
    })

    it("Deve ler um  array com a sequência 'id := 2 end' e retornar erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<id,1>",
        "<:=,>",
        "<num,2>",
        "<end,>",
      ]

      readEnd(tokens,3)
      expect(console.log.mock.calls[0][0]).toBe("Faltou um '.' no fechamento do código");
    })


    // it("Deve ler um array com a sequência 'id program id;' e retornar um erro",()=>{

    //   console.log = jest.fn()

    //   const tokens = [
    //     "<id,1>",
    //     "<program,>",
    //     "<id,1>",
    //     "<;,>",
    //     "<end,>"
    //   ]
    //   readProgram(tokens)
    //   expect(console.log.mock.calls[0][0]).toBe("A primeira coisa a ser informada no programa deve ser o nome dele");
    // })

    // it("Deve ler um array com a sequência 'program program id;' e retornar um erro",()=>{

    //   console.log = jest.fn()

    //   const tokens = [
    //     "<program,>",
    //     "<program,>",
    //     "<id,1>",
    //     "<;,>",
    //     "<end,>"
    //   ]
    //   readProgram(tokens)
    //   expect(console.log.mock.calls[0][0]).toBe("É esperado um id após o 'program'");
    // })



    // it("Deve ler um array com a sequência 'program id id;' e retornar um erro",()=>{

    //   console.log = jest.fn()

    //   const tokens = [
    //     "<program,>",
    //     "<id,1>",
    //     "<id,2>",
    //     "<;,>",
    //     "<end,>"
    //   ]
    //   readProgram(tokens)
    //   expect(console.log.mock.calls[0][0]).toBe("É necessário finalizar a declaração do nome do programa com ';'");
    // })

  })

});
