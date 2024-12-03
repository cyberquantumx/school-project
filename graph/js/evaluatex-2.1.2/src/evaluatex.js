import lexer from "./lexer.js";
import parser from "./parser.js";
import replaceToken from "./util/replaceToken.js";

/*
export default function evaluatex(expression, constants = {}, options = {}) {
    const tokens = lexer(expression, constants, options);
    const ast = parser(tokens).simplify();
    console.log(ast)
    let x = ast.evaluate(constants);
    return x;
}*/

const evaluatex = {
    parseTokens: (expression, constants = {}, options = {}) => {
        const tokens = lexer(expression, constants, options);
        const ast = parser(tokens).simplify();
        return ast;
    },

    evaluatex: (ast, constants) => {
        let x = ast.evaluate(constants);
        return x;
    }
}

export default evaluatex;