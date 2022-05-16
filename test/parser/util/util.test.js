const { 
  deleteUnexpectedTokens,
  getToken,
  readIdAfterIntOrFloat,
  readProgram,
  readIdAfterVar,
  readEnd,
  readBegin,
  validateExpression,
  readIf,
  readWhile,
  readElse,
  validateExpressionAfterAssigment
  
} = require("../../../util/util");

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


  describe("readIdAfterIntOrFloat",() => {

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
      readIdAfterIntOrFloat(tokens,1)
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
      readIdAfterIntOrFloat(tokens,1)
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
      readIdAfterIntOrFloat(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("Após um id deve haver um desses elementos -> (';',':=',','");
    })

    it("Deve ler um array com a sequência 'id' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<int,>",
        "<id,1>",
      ]
      readIdAfterIntOrFloat(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("Fim inesperado após a leitura de um id");
    })


    it("Deve ler um array com a sequência 'int' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<int,>",
      ]
      readIdAfterIntOrFloat(tokens,1)
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


  describe("readIdAfterVar",() => {

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
      readIdAfterVar(tokens,1)
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
      readIdAfterVar(tokens,1)
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
      readIdAfterVar(tokens,1)
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
      readIdAfterVar(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("É necessário o uso do ';' após a atribuição de um var");
    })


    it("Deve ler um array com a sequência 'var id :=' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<var,>",
        "<id,1>",
        "<:=,>",
      ]
      readIdAfterVar(tokens,1)
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
      readIdAfterVar(tokens,1)
      expect(console.log.mock.calls[0][0]).toBe("Fim inesperado após a leitura de uma string");
    })

    
  })
  

  describe("readEnd",()=>{

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });


    it("Deve ler um  array com a sequência 'begin id := 2 end id' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<begin,>",
        "<id,1>",
        "<:=,>",
        "<num,2>",
        "<end,>",
        "<id,2>"
      ]

      readEnd(tokens,4)
      expect(console.log).not.toHaveBeenCalled()
    })


    it("Deve ler um  array com a sequência 'begin id := 2 end.' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<begin,>",
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

    it("Deve ler um  array com a sequência 'begin id := 2 end' e retornar erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<begin,>",
        "<id,1>",
        "<:=,>",
        "<num,2>",
        "<end,>",
      ]

      readEnd(tokens,4)
      expect(console.log.mock.calls[0][0]).toBe("Faltou um '.' no fechamento do código");
    })


  })


  describe("begin",()=>{

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });

    it("Deve ler um  array com a sequência 'begin begin int id := num;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<begin,>",
        "<begin,>",
        "<int,>",
        "<id,1>",
        "<:=,>",
        "<num,10>",
        "<;,>",
        "<end,>"
      ]
      readBegin(tokens,0)
      expect(console.log).not.toHaveBeenCalled()
    })

    it("Deve ler um  array com a sequência 'begin int id := num;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<begin,>",
        "<int,>",
        "<id,1>",
        "<:=,>",
        "<num,2>",
        "<;,>",
        "<end,>"
      ]
      readBegin(tokens,0)
      expect(console.log).not.toHaveBeenCalled()
    })

      it("Deve ler um  array com a sequência 'begin relação int id := num;' sem nenhum erro",()=>{

        console.log = jest.fn()

        const tokens = [
          "<begin,>",
          '<relação,MEQ>',
          "<int,>",
          "<id,1>",
          "<:=,>",
          "<num,10>",
          "<;,>",
          "<end,>"
        ]
        readBegin(tokens,0)
        
        expect(console.log.mock.calls[0][0]).toBe("Após um begin é necessário um desses identificadores -> (if,while,begin,var,float,int)");
      })

    it("Deve ler um  array com a sequência 'begin var id := string;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<begin,>",
        "<var,>",
        "<id,1>",
        "<:=,>",
        "<string,'caramelo'>",
        "<;,>",
        "<end,>"
      ]
      readBegin(tokens,0)
      expect(console.log).not.toHaveBeenCalled()
    })



    it("Deve ler um  array com a sequência 'begin id := num;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<begin,>",
        "<id,1>",
        "<:=,>",
        "<num,3>",
        "<;,>",
        "<end,>"
      ]
      readBegin(tokens,0)
      expect(console.log).not.toHaveBeenCalled()
    })

 

    it("Deve ler um  array com a sequência 'begin if id MEQ then id := num  ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<begin,>",
        "<if,>",
        "<(,>",
        "<id,1>",
        '<relação,MEQ>',
        "<num,2>",
        "<),>",
        "<then,>",
        "<id,1>",
        "<:=,>",
        "<num,2>",
 
        "<end,>"
      ]
      readBegin(tokens,0)
      expect(console.log).not.toHaveBeenCalled()
    })


    it("Deve ler um  array com a sequência 'begin while id relação then id := num  ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<begin,>",
        "<while,>",
        "<(,>",
        "<id,1>",
        '<relação,MEQ>',
        "<num,2>",
        "<),>",
        "<do,>",
        "<id,1>",
        "<:=,>",
        "<num,2>",
        "<;,>",
        "<end,>"
      ]
      readBegin(tokens,0)
      expect(console.log).not.toHaveBeenCalled()
    })

  })


  describe("validateExpression",() => {

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });


    it("Deve ler um  array com a sequência '( id ) ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<(,>",
        "<id,1>",
        "<),>",
      ]

      const {index,tokens}= validateExpression(tk,0)
      expect(index).toEqual(2)
      expect(tokens).toEqual(tk)
      expect(console.log).not.toHaveBeenCalled()
    })

    it("Deve ler um  array com a sequência '( num ) ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<(,>",
        "<num,1>",
        "<),>",
      ]

      const {index,tokens}= validateExpression(tk,0)
      expect(index).toEqual(2)
      expect(tokens).toEqual(tk)
      expect(console.log).not.toHaveBeenCalled()
    })


    it("Deve ler um  array com a sequência '( num operador id ) ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<(,>",
        "<num,1>",
        "<operador,+>",
        "<id,1>",
        "<),>",
      ]

      const {index,tokens}= validateExpression(tk,0)
      expect(index).toEqual(4)
      expect(tokens).toEqual(tk)
      expect(console.log).not.toHaveBeenCalled()   
    })

    it("Deve ler um  array com a sequência '( num operador num ) ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<(,>",
        "<num,1>",
        "<operador,+>",
        "<num,1>",
        "<),>",
      ]

      const {index,tokens}= validateExpression(tk,0)
      expect(index).toEqual(4)
      expect(tokens).toEqual(tk)
      expect(console.log).not.toHaveBeenCalled()   
    })


    it("Deve ler um  array com a sequência '( num relação num ) ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<(,>",
        "<num,1>",
        "<relação,MEQ>",
        "<num,1>",
        "<),>",
      ]

      expect(console.log).not.toHaveBeenCalled()   
      const {index,tokens}= validateExpression(tk,0)
      expect(index).toEqual(4)
      expect(tokens).toEqual(tk)
      
    })


    it("Deve ler um  array com a sequência '( num relação id ) ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<(,>",
        "<num,1>",
        "<relação,MEQ>",
        "<id,2>",
        "<),>",
      ]

      expect(console.log).not.toHaveBeenCalled()   
      const {index,tokens}= validateExpression(tk,0)
      expect(index).toEqual(4)
      expect(tokens).toEqual(tk)
      
    })

    it("Deve ler um  array com a sequência '( num operador id operador num ) ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<(,>",
        "<num,1>",
        "<operador,+>",
        "<id,2>",
        "<operador,*>",
        "<num,2>",
        "<operador,*>",
        "<num,2>",
        "<),>",
      ]

      expect(console.log).not.toHaveBeenCalled()   
      const {index,tokens}= validateExpression(tk,0)
      expect(index).toEqual(8)
      expect(tokens).toEqual(tk)
      
    })

    it("Deve ler um  array com a sequência '( num operador id operador num relação id) ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<(,>",
        "<num,1>",
        "<operador,+>",
        "<id,2>",
        "<operador,*>",
        "<num,2>",
        "<operador,*>",
        "<num,2>",
        "<relação,MEQ>",
        "<id,5>",
        "<),>",
      ]

      expect(console.log).not.toHaveBeenCalled()   
      const {index,tokens}= validateExpression(tk,0)
      expect(index).toEqual(10)
      expect(tokens).toEqual(tk)
      
    })

  })


  describe("readIf",() => {

    it("Deve ler um  array com a sequência 'if ( num operador id operador num relação id) then ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<if,>",
        "<(,>",
        "<num,1>",
        "<operador,+>",
        "<id,2>",
        "<operador,*>",
        "<num,2>",
        "<operador,*>",
        "<num,2>",
        "<relação,MEQ>",
        "<id,5>",
        "<),>",
        "<then,>"
      ]

      readIf(tokens,0)
      expect(console.log).not.toHaveBeenCalled()       
    })

    it("Deve ler um  array com a sequência 'if ( num operador id operador num relação id) id ' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<if,>",
        "<(,>",
        "<num,1>",
        "<operador,+>",
        "<id,2>",
        "<operador,*>",
        "<num,2>",
        "<operador,*>",
        "<num,2>",
        "<relação,MEQ>",
        "<id,5>",
        "<),>",
        "<id,>",
        "<then,>"
      ]

      readIf(tokens,0)
      expect(console.log.mock.calls[0][0]).toBe("É necessário que haja um then após a expressão de um if");  
    })

  })


  describe("readWhile",() => {

    it("Deve ler um  array com a sequência 'while ( num operador id operador num relação id) do ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<while,>",
        "<(,>",
        "<num,1>",
        "<operador,+>",
        "<id,2>",
        "<operador,*>",
        "<num,2>",
        "<operador,*>",
        "<num,2>",
        "<relação,MEQ>",
        "<id,5>",
        "<),>",
        "<do,>"
      ]

      readWhile(tokens,0)
      expect(console.log).not.toHaveBeenCalled()       
    })

    it("Deve ler um  array com a sequência 'while ( num operador id operador num relação id) id' e retornar um erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<while,>",
        "<(,>",
        "<num,1>",
        "<operador,+>",
        "<id,2>",
        "<operador,*>",
        "<num,2>",
        "<operador,*>",
        "<num,2>",
        "<relação,MEQ>",
        "<id,5>",
        "<),>",
        "<id,>",
        "<do,>"
      ]

      readWhile(tokens,0)
      expect(console.log.mock.calls[0][0]).toBe("É necessário que haja um do após a expressão de um while"); 
    })

  })


  describe("readElse",() => {

    it("Deve ler um  array com a sequência 'if ( num ) then  else ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<if,>",
        "<(,>",
        "<num,1>",
        "<),>",
        "<then,>",
        "<id,>",
        "<:=,>",
        "<num,1>",
        "<else,*>",
      ]
      readElse(tokens,5)
      expect(console.log).not.toHaveBeenCalled()       
    })

    it("Deve ler um  array com a sequência 'else ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tokens = [
        "<(,>",
        "<num,1>",
        "<),>",
        "<then,>",
        "<id,>",
        "<:=,>",
        "<num,1>",
        "<else,*>",
      ]
      readElse(tokens,4)
      expect(console.log.mock.calls[0][0]).toBe("Um else inesperado foi recebido"); 

    })

  })

  describe("validateExpressionAfterAssigment",() => {

    afterEach(() => {
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });


    it("Deve ler um  array com a sequência 'id ;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<id,1>",
        "<;,>",
      ]

      const {index,tokens}= validateExpressionAfterAssigment(tk,0)
      expect(index).toEqual(1)
      expect(tokens).toEqual(tk)
      expect(console.log).not.toHaveBeenCalled()
    })

    it("Deve ler um  array com a sequência 'num ;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<num,1>",
        "<;,>",
      ]

      const {index,tokens}= validateExpressionAfterAssigment(tk,0)
      expect(index).toEqual(1)
      expect(tokens).toEqual(tk)
      expect(console.log).not.toHaveBeenCalled()
    })


    it("Deve ler um  array com a sequência 'num operador id ;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<num,1>",
        "<operador,+>",
        "<id,1>",
        "<;,>",
      ]

      const {index,tokens}= validateExpressionAfterAssigment(tk,0)
      expect(index).toEqual(3)
      expect(tokens).toEqual(tk)
      expect(console.log).not.toHaveBeenCalled()   
    })

    it("Deve ler um  array com a sequência 'num operador num ;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<num,1>",
        "<operador,+>",
        "<num,2>",
        "<;,>",
      ]

      const {index,tokens}= validateExpressionAfterAssigment(tk,0)
      expect(index).toEqual(3)
      expect(tokens).toEqual(tk)
      expect(console.log).not.toHaveBeenCalled()   
    })


    it("Deve ler um  array com a sequência 'num relação num ;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<num,1>",
        "<relação,MEQ>",
        "<num,1>",
        "<;,>",
      ]

      expect(console.log).not.toHaveBeenCalled()   
      const {index,tokens}= validateExpressionAfterAssigment(tk,0)
      expect(index).toEqual(3)
      expect(tokens).toEqual(tk)
      
    })


    it("Deve ler um  array com a sequência 'num relação id ;' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<num,1>",
        "<relação,MEQ>",
        "<id,2>",
        "<;,>",
      ]

      expect(console.log).not.toHaveBeenCalled()   
      const {index,tokens}= validateExpressionAfterAssigment(tk,0)
      expect(index).toEqual(3)
      expect(tokens).toEqual(tk)
      
    })

    it("Deve ler um  array com a sequência '( num operador id operador num ) ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<num,1>",
        "<operador,+>",
        "<id,2>",
        "<operador,*>",
        "<num,2>",
        "<operador,*>",
        "<num,2>",
        "<;,>",
      ]

      expect(console.log).not.toHaveBeenCalled()   

      const {index,tokens}= validateExpressionAfterAssigment(tk,0)
      expect(index).toEqual(7)
      expect(tokens).toEqual(tk)
      
    })

    it("Deve ler um  array com a sequência '( num operador id operador num relação id) ' sem nenhum erro",()=>{

      console.log = jest.fn()

      const tk = [
        "<num,1>",
        "<operador,+>",
        "<id,2>",
        "<operador,*>",
        "<num,2>",
        "<operador,*>",
        "<num,2>",
        "<relação,MEQ>",
        "<id,5>",
        "<;,>",
      ]

      expect(console.log).not.toHaveBeenCalled()   
      const {index,tokens}= validateExpressionAfterAssigment(tk,0)
      expect(index).toEqual(9)
      expect(tokens).toEqual(tk)
      
     })

  })

}); 
