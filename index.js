const lexicalAnalyzer = require("./lexicalAnalyzer/lexicalAnalyzer")


const Parser = async() =>{

  const { tokens,ids } = await lexicalAnalyzer()
  console.log(tokens,ids)
}

Parser()