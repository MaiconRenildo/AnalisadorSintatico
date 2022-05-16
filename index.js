const lexicalAnalyzer = require("./lexicalAnalyzer/lexicalAnalyzer")
const util = require("./util/util")

const Parser = async() =>{

  const { tokens,ids } = await lexicalAnalyzer()
  console.log(ids)
  tokens.forEach((t, index) => {
    console.log(index,t)
  })
  
  
  try {
    util.nextToken(tokens,0)    

  } catch (error) {
    console.error(error)
  }
  
}

Parser()