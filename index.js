const lexicalAnalyzer = require("./lexicalAnalyzer/lexicalAnalyzer")


const Parser = async() =>{

  const { tokens,ids } = await lexicalAnalyzer()
  console.log(tokens)
  console.log(ids)
  // start(tokens)

  // console.log(tokens,ids)
  // return {tokens, ids}
}

Parser()


const leint = ()=>{

}


// int ou var -> precisa ler id
const trataInt= (ind) => {
  
}





const getToken = (t) => t.slice(1,t.lastIndexOf(','))

const start = (tokens) => {
  tokens.forEach((t, index) => {
    let token = getToken(t)
    switch(index) {
      case 0:
        if(token != "program") throw "Primeiro token não é 'program'";
        break;
      case 1:
        if(token != 'id') throw "Seundo token não é 'id";
        break;
      case 2:
        if(token != ';') throw "Terceiro token não é ';'"
        break;

      default:
        switch(token) {
          case 'var':
          case 'int':
          case 'float':
            if(token[index+1] != 'id') throw 'Erro: token invalido apos token ' + token + ': ' + token[index+1]
            break;
        
          case 'begin':
            break;
          case 'do':
            break;
          case 'while':
            break;
          case 'then':
            break;
          case 'if':
            break;
          case 'else':
            break;
          case 'end':
            break;
          case 'read':
            break;
          case 'write':
            break;
          case 'not':
            break;
          case 'div':
            break;
          case 'and':
            break;
          case 'procedure':
            break;
          case 'true':
            break;
          case 'false':
            break;
          case 'id':
            if(![',',';','operador',':=','relação'].includes(tokens[index+1])) {
              throw "Erro: token inválido após token "+ token + ": " +  tokens[index+1]
            }
            break;
          case 'relação':
          case 'operador':
            if(!['num','id'].includes(tokens[index+1])) {
              throw "Erro: token inválido após token " + token + ": " + token[index+1]
            }
            break;
          case 'num':
            break;
          

          
          default:
            throw 'Token inválido: ' + token
        }
        
    }

  })

}