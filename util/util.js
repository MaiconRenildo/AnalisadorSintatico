const getToken = (token) => token == "<,,>" ? "," : token.slice(1, token.indexOf(","));

const throwsAnError = (message, token = null, index = null) => console.log(message + " Token: " + token + " Index: " + index);

const deleteUnexpectedTokens = (tokens, index, sinc) => {
  let indexPercorre = index
  while (index < tokens.length) {
    if (sinc.includes(getToken(tokens[index]))) {
      return tokens;
    }
    console.log('Removeu token: ' + tokens.splice(index, 1) + ' Index: ' + indexPercorre++);
  }
  throw (`Erro na compilação: Chegou no fim do arquivo enquanto esperava-se um desses tokens -> (${sinc.toString()})`);  
};

///////////////////////////// PROCESSO DE LEITURA DO PROGRAM ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readProgram = (tokens) => {
  const firstToken = getToken(tokens[0]);

  if (firstToken != "program") {
    throwsAnError(
      "A primeira coisa a ser informada no programa deve ser o nome dele",
      firstToken, 0
    );
    tokens = deleteUnexpectedTokens(tokens, 0, ["program"]);
  }

  const secondToken = getToken(tokens[1]);

  if (secondToken != "id") {
    throwsAnError("É esperado um id após o 'program'", secondToken, 1);
    tokens = deleteUnexpectedTokens(tokens, 1, ["id"]);
  }

  const thirdToken = getToken(tokens[2]);


  if (thirdToken != ";") {
    throwsAnError(
      "É necessário finalizar a declaração do nome do programa com ';'",
      thirdToken,
      2
    );
    tokens = deleteUnexpectedTokens(tokens, 1, [";"]);
  }

  return nextToken(tokens, 3);
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////// PROCESSO DE LEITURA DE UM ID APÓS A LEITURA DE UM INT OU FLOAT ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readAfterIdAfterIntOrFloat = (tokens, index) => {
  if (!tokens || index >= tokens.length)
    return throwsAnError("Fim inesperado após a leitura de um id");

  const secondToken = getToken(tokens[index]);
  if (secondToken == ",") return readIdAfterIntOrFloat(tokens, index + 1); // int id,
  if (secondToken == ";") return nextToken(tokens, index + 1); // int id;
  if (secondToken == ":=") return readAfterAssignment(tokens, index + 1); // int id:=

  throwsAnError("Após um id deve haver um desses elementos -> (';',':=',','", secondToken, index);
  tokens = deleteUnexpectedTokens(tokens, index, [";", ",", ":="]); // index+1 -> ; := ou ,

  return readAfterIdAfterIntOrFloat(tokens, index);
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////// PROCESSO DE LEITURA DO INT OU FLOAT ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readIdAfterIntOrFloat = (tokens, index) => {
  if (!tokens || index >= tokens.length) return throwsAnError("Fim inesperado após a leitura de um int/float");

  let token = getToken(tokens[index])
  if (token != "id") {
    throwsAnError("Um id é necessário após o int/float", token, index);
    tokens = deleteUnexpectedTokens(tokens, index, ["id"]); // index -> id
  }

  return readAfterIdAfterIntOrFloat(tokens, index + 1);
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////// PROCESSO DE LEITURA DE UM ID APÓS A LEITURA DE UM VAR  ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readAfterIdAfterVar = (tokens, index) => {

  if (!tokens || index >= tokens.length) return throwsAnError("Fim inesperado após a leitura de um id");


  const secondToken = getToken(tokens[index]);
  if (secondToken == ",") return readIdAfterIntOrFloat(tokens, index + 1); // var id,
  if (secondToken == ";") return nextToken(tokens, index + 1); // var id;

  if (secondToken == ":="){

    if (index+1 >= tokens.length) return throwsAnError("Fim inesperado após a leitura de um ':='");

    const thirdToken = getToken(tokens[index+1])
    if(thirdToken!='string'){
      throwsAnError("A um var só é possível atribuir strings", thirdToken, index+1);
      tokens = deleteUnexpectedTokens(tokens, index+1, ["string"]);
    }

    if (index+2 >= tokens.length) return throwsAnError("Fim inesperado após a leitura de uma string");

    const fourthToken = getToken(tokens[index+2])
    if(fourthToken!=';'){
      throwsAnError("É necessário o uso do ';' após a atribuição de um var", fourthToken, index+2);
      tokens = deleteUnexpectedTokens(tokens, index+2, [";"]);
    }

    return nextToken(tokens,index+3)

  }

  throwsAnError("Após um id deve haver um desses elementos -> (';',':=',','", secondToken, index);
  tokens = deleteUnexpectedTokens(tokens, index, [";", ",", ":="]); // index+1 -> ; := ou ,

  return readAfterIdAfterVar(tokens, index);
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////// PROCESSO DE LEITURA DO VAR ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readIdAfterVar = (tokens, index) => {

  if (!tokens || index >= tokens.length) return throwsAnError("Fim inesperado após a leitura de um var");

  let token = getToken(tokens[index])
  if (token != "id") {
    throwsAnError("Um id é necessário após o var", token, index);
    tokens = deleteUnexpectedTokens(tokens, index, ["id"]); // index -> id
  }


  return readAfterIdAfterVar(tokens, index + 1);
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

  if(secondToken==".") return tokens

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
 
  if(secondToken=="var") return readIdAfterVar(tokens,index+2)
  if(secondToken=="float"||secondToken=="int") return readIdAfterIntOrFloat(tokens,index+2)    
  
  if(secondToken=="id") return nextToken(tokens,index+2)
  
  throwsAnError("Após um begin é necessário um desses identificadores -> (if,while,begin,var,float,int)", secondToken, index+1);
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
    let token = getToken(tokens[i])    
    if(token=="id" || token=="num") return rIdOrNum(i+1, token)    

    throwsAnError("Elemento inválido após um parâmetro de operação", token , i);
    tokens = deleteUnexpectedTokens(tokens, i, ["id","num"]);
    return rOperation(i)
  }


  const rIdOrNum = (i, tokenLido) => {    
    let token = getToken(tokens[i])    
    if(token=="relação") return rRelation(i+1)
    if(token=="operador") return rOperation(i+1)
    if(token==")") return rTheEnd(i)
    if(token==";") return rTheEnd(i)

    throwsAnError("Elemento inválido após um " + tokenLido +" dentro de uma expressão", token, i);
    tokens = deleteUnexpectedTokens(tokens, i, ["operador","relação"]);
    return rOperation(i+1)
  }

  const rRelation = (i) => {
    let token = getToken(tokens[i])    
    if(token=="id" || token=="num") return rIdOrNum(i+1, token)    

    throwsAnError("Elemento inválido após um parâmetro de relação", token, i);
    tokens = deleteUnexpectedTokens(tokens, i, ["id","num"]);
    return rRelation(i)
  }


  const rStart = (i) => {
    let token = getToken(tokens[i])    
    if(token=="operador" || token=="(") return rStart(i+1)
    if(token=="id" || token=="num") return rIdOrNum(i+1, token)

    throwsAnError("Elemento inválido após a abertura de parenteses", token, i);
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



////////////////////////////////// PROCESSO DE LEITURA DO IF ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const readIf = (tokens,index) => {

  const { index:newIndex,tokens:newTokens } = validateExpression(tokens,index+1) // Já leu (expressao)

  const secondToken = getToken(newTokens[newIndex+1])
  if(secondToken!="then"){
    throwsAnError("É necessário que haja um then após a expressão de um if", secondToken, newIndex+1);
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
    throwsAnError("É necessário que haja um do após a expressão de um while", secondToken, newIndex+1);
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

const readAfterAssignment = (tokens, index) => {
  const { index:newIndex,tokens:newTokens } = validateExpression(tokens,index) // Já leu (expressao)
  return nextToken(newTokens,newIndex+1) ;
};

const validateExpressionAfterAssigment = validateExpression
/* const validateExpressionAfterAssigment = (tokens,index) => {

  const rOperation = (i) => {
    let token = getToken(tokens[i])
    if(token=="id") return rId(i+1)
    if(token=="num") return rNum(i+1)

    throwsAnError("Elemento inválido após um parâmetro de operação", token, i);
    tokens = deleteUnexpectedTokens(tokens, i, ["id","num"]);
    return rOperation(i)
  }

  const rId = (i) => {
    let token = getToken(tokens[i])
    if(token=="relação") return rRelation(i+1)
    if(token=="operador") return rOperation(i+1)
    if(token==";") return rTheEnd(i)

    throwsAnError("Elemento inválido após um id dentro de uma expressão", token, i);
    tokens = deleteUnexpectedTokens(tokens, i, ["operador","relação"]);
    return rOperation(i)
  }

  const rNum = (i) => {
    let token = getToken(tokens[i])
    if(token=="relação") return rRelation(i+1)
    if(token=="operador") return rOperation(i+1)
    if(token==";") return rTheEnd(i)

    throwsAnError("Elemento inválido após um num dentro de uma expressão", token, i);
    tokens = deleteUnexpectedTokens(tokens, i, ["operador","relação"]);
    return rOperation(i)
  }

  const rRelation = (i) => {
    let token = getToken(tokens[i])
    if(token=="id") return rId(i+1)
    if(token=="num") return rNum(i+1)

    throwsAnError("Elemento inválido após um parâmetro de relação", token, i);
    tokens = deleteUnexpectedTokens(tokens, i, ["id","num"]);
    return rRelation(i)
  }


  const rStart = (i) => {
    let token = getToken(tokens[i])
    if(token=="num") return rNum(i+1)
    if(token=="id") return rId(i+1)

    throwsAnError("Elemento inválido após a abertura de parenteses", token, i);
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


} */

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////// FUNÇÃO PRINCIPAL  ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////


const nextToken = (tokens, index) => {
  let token = getToken(tokens[index])
  console.log("Recebeu token " + token + " na posição " + index)
  switch(token){

    case "program":
      return readProgram(tokens)
    case "if":
      return readIf(tokens,index)
    case "else":
      return readElse(tokens,index)
    case "while":
      return readWhile(tokens, index)
    case "begin":
      return readBegin(tokens, index)
    case "end":
      return readEnd(tokens, index)
    case "int":
    case "float":
      return readIdAfterIntOrFloat(tokens, index + 1)
    case "var":
      return readIdAfterVar(tokens, index + 1)
    case "id":
      return nextToken(tokens, index + 1)
    case ":=":
      return readAfterAssignment(tokens, index + 1)
    case "then":
      return nextToken(tokens, index + 1)

    default:
      throwsAnError("Token inválido. Removendo...", token, index)
      tokens.splice(index,1)
      return nextToken(tokens,index)


  }
  return 

};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////



module.exports = {
  validateExpressionAfterAssigment,
  deleteUnexpectedTokens,
  validateExpression,
  readIdAfterIntOrFloat,
  throwsAnError,
  readProgram,
  readWhile,
  readBegin,
  readElse,
  getToken,
  readIdAfterVar,
  readEnd,
  readIf,
  nextToken
};
