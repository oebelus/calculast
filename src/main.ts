import { AST } from "./ast";
import { sya } from "./sya";
import { tokenizer } from "./tokeniser";
import { rpnEvaluator } from "./rpnEvaluator";
import * as readlineSync from 'readline-sync';
import { Token } from "./types";

// Function to get user input
function getUserInput(): string {
    return readlineSync.question('Enter a mathematical expression: ');
}

function main() {
    const expression = getUserInput();

    const token_1 = tokenizer(expression)
    const token_2 = token_1.map((x:Token) => x )

    const rpn_1 = sya(token_1)
    const rpn_2 = sya(token_2)
    console.log("The Reverse Polish Notation of your expression: ", rpn_1.join(" "))

    // Construct an AST and evaluate it
    const ast = new AST();
    ast.Add(rpn_1);

    // Evaluate RPN using stack calculation
    const rpnResult = rpnEvaluator(rpn_2);

    // Output results
    console.log("Result from AST evaluation:", ast.Collapse(ast.root!));
    console.log("Result from RPN evaluation using stack calculation:", rpnResult);
}

// Call the main function
main();