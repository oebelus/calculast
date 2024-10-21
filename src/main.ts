// import { AST } from "./AST";
// import { ShuntingYard } from "./ShuntingYard";
import { tokenizer } from "./Tokeniser";
// import { rpnEvaluator } from "./RPNEvaluator";
import * as readlineSync from 'readline-sync';
import { Token, TokenType } from "./Types";
import { ShuntingYard } from "./ShuntingYard";
import { tokensToArray } from "./Utils";
import { rpnEvaluator } from "./RPNEvaluator";
import { AST } from "./AST";

// Function to get user input
function getUserInput(): string {
    return readlineSync.question('Enter a mathematical expression: ');
}

function main() {
    const expression = getUserInput();

    const token_1 = tokenizer(expression)
    const token_2 = token_1.map((x:Token) => x )

    const rpn_1 = ShuntingYard(token_1)
    const rpn_2 = ShuntingYard(token_2)
    console.log("The Reverse Polish Notation of your expression: ", tokensToArray(rpn_1).join(" "))

    // Construct an AST and evaluate it
    const ast = new AST();
    ast.Add(rpn_1);

    // Evaluate RPN using stack calculation
    const rpnResult = rpnEvaluator(rpn_2);

    // Output results
    console.log("Result from AST evaluation:", ast.Collapse(ast.root!));
    console.log("Result from RPN evaluation using stack calculation:", rpnResult);
}
main();