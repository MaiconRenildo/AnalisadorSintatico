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

const afterId = (tokens, index) => {
  if (!tokens || index >= tokens.length)
    return throwsAnError("Fim inesperado após a leitura de um id");

  const secondToken = getToken(tokens[index]);
  if (secondToken == ",") return afterIntOrFloat(tokens, index + 1); // int id,
  if (secondToken == ";") return nextToken(tokens, index + 1); // int id;
  if (secondToken == ":=") return afterAssignment(tokens, index + 1); // int id:=

  throwsAnError("Após um id deve haver um desses elementos -> (';',':=',','");
  tokens = deleteUnexpectedTokens(tokens, index, [";", ",", ":="]); // index+1 -> ; := ou ,

  return afterId(tokens, index);
};

const afterIntOrFloat = (tokens, index) => {
  if (!tokens || index >= tokens.length)
    return throwsAnError("Fim inesperado após a leitura de um int/float");

  if (getToken(tokens[index]) != "id") {
    throwsAnError("Um id é necessário após o int/float");
    tokens = deleteUnexpectedTokens(tokens, index, ["id"]); // index -> id
  }

  return afterId(tokens, index + 1);
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
  
  if(foundOn==-1){

    if (index+1 >= tokens.length) return throwsAnError("Faltou um '.' no fechamento do código");

    const secondToken = getToken(tokens[index+1])
    if(secondToken=="."){
      return true
    }else{
      return throwsAnError("Um end inesperado foi recebido")
    }
  }

  tokens.splice(foundOn,1)
  nextToken(tokens,index)
};

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  deleteUnexpectedTokens,
  afterIntOrFloat,
  throwsAnError,
  getToken,
  readProgram,
  afterVar,
  readEnd
};




/////////////////////////////////////////////////////////////////////////////////////////

const nextToken = (tokens, index) => {
  ///
  return;
};

const afterAssignment = (tokens, index) => {
  // :=

  // num ou id
  // em sequencia pode ter operador ou comparador ou ponto e virgula

  return;
};

/////////////////////////////////////////////////////////////////////////////////////////

/*
AB->aC
A->b
C->k

INT -> id,INT2 | id; | id EXPRESSAO
INT2 -> id,INT2 | id;
EXPRESSAO -> id | num | id OPERADOR | num OPERADOR
OPERADOR -> id | num
VAR -> id
FLOAT -> id
OPERADOR -> id | num
RELACAO -> id | num
PROGRAM -> id;
IF -> (EXPRESSAO RELACAO EXPRESSAO) then


int id ; 

*/

// const proximoToken = (tokens,index) => {

//   switch(tokens[index]) {
//     case 'int':
//       trataInt(tokens,index)
//       break;
//     case 'var':
//       trataVar(tokens,index)
//       break;
//     case ':=':
//       //trataExpressao(tokens,index)
//       break;
//     case 'operador':
//       //trataOperador(tokens,index)
//       break;
//     case 'relação':
//       //trataRelacao(tokens,index)
//       break;
//     default:
//       throw 'Token inválido: ' + tokens[index]
//   }
// }

// const trataInt = (tokens,index) => {

//   // int id
//   if( getToken(tokens[index])!="id"){

//     // erro -> modo panico
//     tokens = findToken(tokens,["id"],index)

//     //  int id;
//     if ( getToken(tokens[index+1])==";" ){

//       token = getToken(tokens[index+1])
//       // Seleciona o proximo passo
//     }

//     // int id,
//     if( getToken(tokens[index+1]) =="," ){
//       trataInt(tokens,index+3)
//     }

//     // int id :=
//     if (getToken(tokens[index+1])==":="){
//       trataExpressao(tokens,index+2)
//     }

//     // ERRO -> panico
//     tokens = findToken(tokens,[";",",",":="],index)

//     // CHEGA AQUI
//     // VIRGULA - > trataInt(tokens,index)
//     if(tokens(index)==","){
//       trataInt(tokens,index+1)
//     }

//     // PONTO E VIRGULA -> proximoToken(tokens,index)
//     if(tokens(index)==";"){
//       proximoToken(tokens,index+1)
//     }

//     // := -> trataExpressao(tokens,index)
//     if(tokens(index)==":="){
//       trataExpressao(tokens,index+1)
//     }

//   }

//   //  int id;
//   if ( getToken(tokens[index+1])==";" ){

//       token = getToken(tokens[index+1])
//       // Seleciona o proximo passo
//   }

//   // int id,
//   if( getToken(tokens[index+1]) =="," ){
//     trataInt(tokens,index+3)
//   }

//   // int id :=
//   if (getToken(tokens[index+1])==":="){
//     trataExpressao(tokens,index+2)
//   }

//   // ERRO

// }

// const trataVar =  (tokens,index)=>{

//   // var id
//   if( getToken(tokens[index])!="id"){

//     // erro -> modo panico

//     // buscar o id
//     isId= false

//     while(isId==false && index<=tokens.length){
//       if (getToken(index)=="id"){
//         isId=true
//       }else{
//         tokens.splice(index)
//       }
//     }

//     //  var id;
//     if ( getToken(tokens[index+1])==";" ){

//       token = getToken(tokens[index+1])
//       // Seleciona o proximo passo
//     }

//     // var id,
//     if( getToken(tokens[index+1]) =="," ){
//       trataInt(tokens,index+3)
//     }

//     // var id :=
//     if (getToken(tokens[index+1])==":="){

//       // string
//       if (getToken(tokens[index+1]=="string")){

//         if(getToken(tokens[index+2])==";"){

//         }

//       }else{

//         isString= false

//         while(isString==false && index<=tokens.length){
//           if (getToken(index)=="string"){
//             isId=true
//           }else{
//             tokens.splice(index)
//           }
//         }

//         if(getToken(tokens[index+2])==";"){

//         }

//       }

//     }

//   }

//   //  var id;
//   if ( getToken(tokens[index+1])==";" ){

//     token = getToken(tokens[index+1])
//         // Seleciona o proximo passo
//   }

//       // var id,
//   if( getToken(tokens[index+1]) =="," ){
//     trataInt(tokens,index+3)
//   }

//   // var id :=
//   if (getToken(tokens[index+1])==":="){

//     // string

//   }

// }
