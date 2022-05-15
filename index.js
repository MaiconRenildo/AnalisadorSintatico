const lexicalAnalyzer = require("./lexicalAnalyzer/lexicalAnalyzer")
const nextToken = require("./util/util")

const Parser = async() =>{

  const { tokens,ids } = await lexicalAnalyzer()
  console.log(tokens)
  console.log(ids)

  // UTILIZAR A NEXT TOKEN
}

Parser()