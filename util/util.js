


const trataExpressao = (tokens,index)=>{

}


const findToken = (tokens,tokensValidos,index)=>{
  isValid = false;

  while(isValid==false && index<=tokens.length){

    token = getToken(index)

    res = tokensValidos.filter( i=>{
      return i==token
    })

    if (res)
      isValid = true
    else
      tokens.splice(index)
    
  }

  return tokens
}


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

const eliminaTokens = (tokens, index, sinc) => {
  while(index < tokens.length) {
    if(sinc.includes(tokens[index])) {
      return tokens
    }
    tokens.splice(index,1)
  }
}

const proximoToken = (tokens,index) => {
  switch(tokens[index]) {
    case 'int':
      trataInt(tokens,index)
      break;
    case 'var':
      trataVar(tokens,index)
      break;
    case ':=':
      //trataExpressao(tokens,index)
      break;
    case 'operador':
      //trataOperador(tokens,index)
      break;
    case 'relação':
      //trataRelacao(tokens,index)
      break;
    default:
      throw 'Token inválido: ' + tokens[index]
  }
}

const trataInt = (tokens,index) => {

  // int id 
  if( getToken(tokens[index])!="id"){
    
    // erro -> modo panico
    tokens = findToken(tokens,["id"],index)


    //  int id;
    if ( getToken(tokens[index+1])==";" ){

      token = getToken(tokens[index+1])
      // Seleciona o proximo passo
    }


    // int id,
    if( getToken(tokens[index+1]) =="," ){
      trataInt(tokens,index+3)
    }


    // int id :=
    if (getToken(tokens[index+1])==":="){
      trataExpressao(tokens,index+2)
    }
    

    // ERRO -> panico
    tokens = findToken(tokens,[";",",",":="],index)

    // CHEGA AQUI
    // VIRGULA - > trataInt(tokens,index)
    if(tokens(index)==","){
      trataInt(tokens,index+1)
    }

    // PONTO E VIRGULA -> proximoToken(tokens,index)
    if(tokens(index)==";"){
      proximoToken(tokens,index+1)
    }
    
    // := -> trataExpressao(tokens,index)
    if(tokens(index)==":="){
      trataExpressao(tokens,index+1)
    }
    

  }


  //  int id;
  if ( getToken(tokens[index+1])==";" ){

      token = getToken(tokens[index+1])
      // Seleciona o proximo passo
  }


  // int id,
  if( getToken(tokens[index+1]) =="," ){
    trataInt(tokens,index+3)
  }


  // int id :=
  if (getToken(tokens[index+1])==":="){
    trataExpressao(tokens,index+2)
  }



  // ERRO
  




}





const trataVar =  (tokens,index)=>{


  // var id 
  if( getToken(tokens[index])!="id"){
    
    // erro -> modo panico
    
    // buscar o id
    isId= false

    while(isId==false && index<=tokens.length){
      if (getToken(index)=="id"){
        isId=true
      }else{
        tokens.splice(index)
      }
    }


    //  var id;
    if ( getToken(tokens[index+1])==";" ){

      token = getToken(tokens[index+1])
      // Seleciona o proximo passo
    }


    // var id,
    if( getToken(tokens[index+1]) =="," ){
      trataInt(tokens,index+3)
    }


    // var id :=
    if (getToken(tokens[index+1])==":="){

      // string
      if (getToken(tokens[index+1]=="string")){


        if(getToken(tokens[index+2])==";"){

        }

      }else{


        isString= false

        while(isString==false && index<=tokens.length){
          if (getToken(index)=="string"){
            isId=true
          }else{
            tokens.splice(index)
          }
        }
        


        if(getToken(tokens[index+2])==";"){

        }



      }


    }
    
  }



  //  var id;
  if ( getToken(tokens[index+1])==";" ){

    token = getToken(tokens[index+1])
        // Seleciona o proximo passo
  }
  
  
      // var id,
  if( getToken(tokens[index+1]) =="," ){
    trataInt(tokens,index+3)
  }
  
  
  // var id :=
  if (getToken(tokens[index+1])==":="){
  
    // string
     
  }



}


const getToken = (t) => t.slice(1,t.indexOf(','))
