const fs = require('fs').promises;
const jsdocParse = require("@jsdoc/parse")

/**
* Sample output (to console), given fileUnderStudy.js:
* [
*  {
*    functionName: 'uncoolFunction',
*    problems: [ 'No leading comment is a comment block.' ]
*  },
*  { functionName: 'sicSharkOnSuperSpy', problems: [] },
*  {
*    functionName: 'functionWithNoComments',
*    problems: [ 'Has no leading comments!' ]
*  }
* ]
*/

async function findAllFunctionsAndReportJSDocStatus() {

    async function getFileContentsAsString(fileName) {
        const data = await fs.readFile(fileName);
        return data.toString();
    }

    const fileName = __dirname + '/fileUnderStudy.js'
    const jsContentsString = await getFileContentsAsString(fileName)
    const fullASTOfJS = jsdocParse.AstBuilder.build(jsContentsString, fileName)

    //uncomment to see the whole AST
    // console.dir(fullASTOfJS, { depth: null })
    console.log(JSON.stringify(fullASTOfJS, null, 2));
    const body = fullASTOfJS.program.body;
    //We'll have to be more flexible to find fn expressions, too.
    const functionDeclarations = body.filter(node => node.type === "FunctionDeclaration")

    const output = functionDeclarations.map(processFunctionDeclaration);
    // console.dir(output, { depth: null });


    /** Given a function declaration AST subtree, return some info about its name and whether it has JSDoc.
     *
     * @returns { {functionName:string, problems: string[]} } - object with functionName, and list of problems (strings)
     * 
     * @example 
     * //output on success:
     * 
     * { functionName: 'sicSharkOnSuperSpy', problems: [] }
     *
     * @example 
     * //output for problem function:
     * 
     *  {
     *    functionName: 'functionWithNoComments',
     *    problems: [ 'Has no leading comments!' ]
     *  }
     */

    function processFunctionDeclaration(funDec) {
        const problems = [];

        if (!funDec.leadingComments) {
            problems.push("Has no leading comments!")
        } else {
            const firstCommentBlock = funDec.leadingComments.find(c => c.type === "CommentBlock");
            if (!firstCommentBlock) {
                problems.push("No leading comment is a comment block.")
            } else {
                //We've got a comment block at least... 
                //TODO: use jsdoc library to know more about it.
            }
        }

        return { functionName: funDec.id.name, problems };
    }
}

findAllFunctionsAndReportJSDocStatus();
