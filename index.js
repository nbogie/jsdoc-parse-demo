const fs = require('fs').promises;
const jsdocParse = require("@jsdoc/parse")



async function getFileContents(fileName) {
    const data = await fs.readFile(fileName);
    return data.toString();
}

async function main() {
    const fileName = __dirname + '/fileUnderStudy.js'
    const contents = await getFileContents(fileName)
    const ast = jsdocParse.AstBuilder.build(contents, fileName)
    // console.dir(ast.program, { depth: 100 })
    console.dir(ast, { depth: 100 })
}

main()