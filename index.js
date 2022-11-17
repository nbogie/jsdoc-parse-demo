const jsdocParse = require("@jsdoc/parse")
const ast = jsdocParse.AstBuilder.build("", "./fileUnderStudy.js")
// console.dir(ast.program, { depth: 100 })
console.dir(ast, { depth: 100 })
