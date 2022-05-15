const getToken = (token) =>
  token == "<,,>" ? "," : token.slice(1, token.indexOf(","));

const throwsAnError = (message) => console.log(message);

const deleteUnexpectedTokens = (tokens, index, sinc) => {
  while (index < tokens.length) {
    if (sinc.includes(getToken(tokens[index]))) {
      return tokens;
    }
    tokens.splice(index, 1);
  }
  throwsAnError(
    `Erro na compilação. Esperava-se um desses tokens -> (${sinc.toString()})`
  );
};



//////////////////////// PROCESSO DE LEITURA DO INT OU FLOAT ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const afterIdafterIntOrFloat = (tokens, index) => {
  if (!tokens || index >= tokens.length)
    return throwsAnError("Fim inesperado após a leitura de um id");

  const secondToken = getToken(tokens[index]);
  if (secondToken == ",") return afterIntOrFloat(tokens, index + 1); // int id,
  if (secondToken == ";") return nextToken(tokens, index + 1); // int id;
  if (secondToken == ":=") return afterAssignment(tokens, index + 1); // int id:=

  throwsAnError("Após um id deve haver um desses elementos -> (';',':=',','");
  tokens = deleteUnexpectedTokens(tokens, index, [";", ",", ":="]); // index+1 -> ; := ou ,

  return afterIdafterIntOrFloat(tokens, index);
};

const afterIntOrFloat = (tokens, index) => {
  if (!tokens || index >= tokens.length)
    return throwsAnError("Fim inesperado após a leitura de um int/float");

  if (getToken(tokens[index]) != "id") {
    throwsAnError("Um id é necessário após o int/float");
    tokens = deleteUnexpectedTokens(tokens, index, ["id"]); // index -> id
  }

  return afterIdafterIntOrFloat(tokens, index + 1);
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////// PROCESSO DE LEITURA DO PROGRAM ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readProgram = (tokens) => {
  const firstToken = getToken(tokens[0]);

  if (firstToken != "program") {
    throwsAnError(
      "A primeira coisa a ser informada no programa deve ser o nome dele"
    );
    tokens = deleteUnexpectedTokens(tokens, 0, ["program"]);
  }

  const secondToken = getToken(tokens[1]);

  if (secondToken != "id") {
    throwsAnError("É esperado um id após o 'program'");
    tokens = deleteUnexpectedTokens(tokens, 1, ["id"]);
  }

  const thirdToken = getToken(tokens[2]);


  if (thirdToken != ";") {
    throwsAnError(
      "É necessário finalizar a declaração do nome do programa com ';'"
    );
    tokens = deleteUnexpectedTokens(tokens, 1, [";"]);
  }

  return nextToken(tokens, 3);
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////// PROCESSO DE LEITURA DO VAR  ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const afterIdAfterVar = (tokens, index) => {

  if (!tokens || index >= tokens.length)
    return throwsAnError("Fim inesperado após a leitura de um id");


  const secondToken = getToken(tokens[index]);
  if (secondToken == ",") return afterIntOrFloat(tokens, index + 1); // var id,
  if (secondToken == ";") return nextToken(tokens, index + 1); // var id;

  if (secondToken == ":="){

    if (index+1 >= tokens.length) return throwsAnError("Fim inesperado após a leitura de um ':='");

    const thirdToken = getToken(tokens[index+1])
    if(thirdToken!='string'){
      throwsAnError("A um var só é possível atribuir strings");
      tokens = deleteUnexpectedTokens(tokens, index+1, ["string"]);
    }

    if (index+2 >= tokens.length) return throwsAnError("Fim inesperado após a leitura de uma string");

    const fourthToken = getToken(tokens[index+2])
    if(fourthToken!=';'){
      throwsAnError("É necessário o uso do ';' após a atribuição de um var");
      tokens = deleteUnexpectedTokens(tokens, index+2, [";"]);
    }

    return nextToken(tokens,index+3)

  }

  throwsAnError("Após um id deve haver um desses elementos -> (';',':=',','");
  tokens = deleteUnexpectedTokens(tokens, index, [";", ",", ":="]); // index+1 -> ; := ou ,

  return afterIdAfterVar(tokens, index);
};

const afterVar = (tokens, index) => {

  if (!tokens || index >= tokens.length)
    return throwsAnError("Fim inesperado após a leitura de um var");

  if (getToken(tokens[index]) != "id") {
    throwsAnError("Um id é necessário após o var");
    tokens = deleteUnexpectedTokens(tokens, index, ["id"]); // index -> id
  }


  return afterIdAfterVar(tokens, index + 1);
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////// PROCESSO DE LEITURA DO END ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readEnd = (tokens,index) => {

  foundOn = tokens.indexOf("<begin,>")
  
  if(foundOn==-1) return throwsAnError("Um end inesperado foi recebido")


  tokens.splice(foundOn,1)


  if (index >= tokens.length) return throwsAnError("Faltou um '.' no fechamento do código");

  const secondToken = getToken(tokens[index])

  if(secondToken==".") return true

  return nextToken(tokens,index)
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////// PROCESSO DE LEITURA DO BEGIN ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readBegin = (tokens,index) => {

  const secondToken = getToken(tokens[index+1])

  if(secondToken=="if") return readIf(tokens,index+1)
  if(secondToken=="while") return readWhile(tokens,index+1)
  if(secondToken=="begin") return readBegin(tokens,index+1)
 
  if(secondToken=="var") return afterVar(tokens,index+2)
  if(secondToken=="float"||secondToken=="int"){


    return afterIntOrFloat(tokens,index+2)
  } 
  if(secondToken=="id") return afterId(tokens,index+2)
  
  throwsAnError("Após um begin é necessário um desses identificadores -> (if,while,begin,var,float,int)");
  tokens = deleteUnexpectedTokens(tokens, index+1, ["if","while","begin","var","float","int"]);

  return readBegin(tokens,index)
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



//SERVE APENAS PARA EXPRESSÕES SIMPLES - REFATORAR
//////////////////////////// PROCESSO DE VALIDAÇÃO DE EXPRESSÃO /////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const validateExpression = (tokens,index)=> {

  const rOperation = (i) => {
    if(getToken(tokens[i])=="id") return rId(i+1)
    if(getToken(tokens[i])=="num") return rNum(i+1)

    throwsAnError("Elemento inválido após um parâmetro de operação");
    tokens = deleteUnexpectedTokens(tokens, i, ["id","num"]);
    return rOperation(i)
  }


  const rId = (i) => {
    if(getToken(tokens[i])=="relação") return rRelation(i+1)
    if(getToken(tokens[i])=="operador") return rOperation(i+1)
    if(getToken(tokens[i])==")") return rTheEnd(i)

    throwsAnError("Elemento inválido após um id dentro de uma expressão");
    tokens = deleteUnexpectedTokens(tokens, i, ["operador","relação"]);
    return rOperation(i)
  }

  const rNum = (i) => {
    if(getToken(tokens[i])=="relação") return rRelation(i+1)
    if(getToken(tokens[i])=="operador") return rOperation(i+1)
    if(getToken(tokens[i])==")") return rTheEnd(i)

    throwsAnError("Elemento inválido após um num dentro de uma expressão");
    tokens = deleteUnexpectedTokens(tokens, i, ["operador","relação"]);
    return rOperation(i)
  }

  const rRelation = (i) => {
    if(getToken(tokens[i])=="id") return rId(i+1)
    if(getToken(tokens[i])=="num") return rNum(i+1)

    throwsAnError("Elemento inválido após um parâmetro de relação");
    tokens = deleteUnexpectedTokens(tokens, i, ["id","num"]);
    return rRelation(i)
  }


  const rStart = (i) => {
    if(getToken(tokens[i])=="num") return rNum(i+1)
    if(getToken(tokens[i])=="id") return rId(i+1)

    throwsAnError("Elemento inválido após a abertura de parenteses");
    tokens = deleteUnexpectedTokens(tokens, i, ["id","num"]);
    return rStart(i)
  }

  const rTheEnd = (i) => {
    return i
  }


  const newIndex = rStart(index+1)
  return {
    tokens,index:newIndex
  }

}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////// PROCESSO DE LEITURA DO IF ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readIf = (tokens,index) => {

  const { index:newIndex,tokens:newTokens } = validateExpression(tokens,index+1) // Já leu (expressao)

  const secondToken = getToken(newTokens[newIndex+1])
  if(secondToken!="then"){
    throwsAnError("É necessário que haja um then após a expressão de um if");
    tokens = deleteUnexpectedTokens(tokens, newIndex+1, ["then"]);
  }

  return nextToken(newTokens,newIndex+1)

};


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////// PROCESSO DE LEITURA DO WHILE //////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readWhile = (tokens,index) => {

  const { index:newIndex,tokens:newTokens } = validateExpression(tokens,index+1) // Já leu (expressao)

  const secondToken = getToken(newTokens[newIndex+1])
  if(secondToken!="do"){
    throwsAnError("É necessário que haja um do após a expressão de um while");
    tokens = deleteUnexpectedTokens(tokens, newIndex+1, ["do"]);
  }

  return nextToken(newTokens,newIndex+1)

};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////// PROCESSO DE LEITURA DO ELSE //////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readElse = (tokens,index) => {

  foundOn = tokens.indexOf("<if,>")
  
  if(foundOn==-1) return throwsAnError("Um else inesperado foi recebido")

  return nextToken(tokens,index+1)
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////// PROCESSO DE LEITURA DO :=  //////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const afterAssignment = (tokens, index) => {
  const { index:newIndex,tokens:newTokens } = validateExpression(tokens,index+1) // Já leu (expressao)
  return nextToken(newTokens,newIndex+1) ;
};


const validateExpressionAfterAssigment = (tokens,index) => {

  const rOperation = (i) => {
    if(getToken(tokens[i])=="id") return rId(i+1)
    if(getToken(tokens[i])=="num") return rNum(i+1)

    throwsAnError("Elemento inválido após um parâmetro de operação");
    tokens = deleteUnexpectedTokens(tokens, i, ["id","num"]);
    return rOperation(i)
  }

  const rId = (i) => {
    if(getToken(tokens[i])=="relação") return rRelation(i+1)
    if(getToken(tokens[i])=="operador") return rOperation(i+1)
    if(getToken(tokens[i])==";") return rTheEnd(i)

    throwsAnError("Elemento inválido após um id dentro de uma expressão");
    tokens = deleteUnexpectedTokens(tokens, i, ["operador","relação"]);
    return rOperation(i)
  }

  const rNum = (i) => {
    if(getToken(tokens[i])=="relação") return rRelation(i+1)
    if(getToken(tokens[i])=="operador") return rOperation(i+1)
    if(getToken(tokens[i])==";") return rTheEnd(i)

    throwsAnError("Elemento inválido após um num dentro de uma expressão");
    tokens = deleteUnexpectedTokens(tokens, i, ["operador","relação"]);
    return rOperation(i)
  }

  const rRelation = (i) => {
    if(getToken(tokens[i])=="id") return rId(i+1)
    if(getToken(tokens[i])=="num") return rNum(i+1)

    throwsAnError("Elemento inválido após um parâmetro de relação");
    tokens = deleteUnexpectedTokens(tokens, i, ["id","num"]);
    return rRelation(i)
  }


  const rStart = (i) => {
    if(getToken(tokens[i])=="num") return rNum(i+1)
    if(getToken(tokens[i])=="id") return rId(i+1)

    throwsAnError("Elemento inválido após a abertura de parenteses");
    tokens = deleteUnexpectedTokens(tokens, i, ["id","num"]);
    return rStart(i)
  }

  const rTheEnd = (i) => {
    return i
  }


  const newIndex = rStart(index)
  return {
    tokens,index:newIndex
  }


}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////// PROCESSO DE LEITURA DO id  ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////


const afterId = (tokens,index) => {
  return nextToken(tokens,index)
}


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////// FUNÇÃO PRINCIPAL  ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////


const nextToken = (tokens, index) => {

  return 
  // let token = getToken(tokens[index])
  // switch(token){

  //   case "program":
  //     return readProgram(tokens)
  //   case "if":
  //     return readIf(tokens,index)
  //   case "else":
  //     return readElse(tokens,index)
  //   case 


  // }
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



module.exports = {
  validateExpressionAfterAssigment,
  deleteUnexpectedTokens,
  validateExpression,
  afterIntOrFloat,
  throwsAnError,
  readProgram,
  readWhile,
  readBegin,
  readElse,
  getToken,
  afterVar,
  readEnd,
  readIf,
};
