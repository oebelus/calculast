import { Token } from "./types";
import { isNumericalLiteral, isUnaryOperation } from "./utils";

export function tokenizer(expression: string): Token[] {
    let tokens: Token[] = [];
    let length: number = expression.length
    let buffer: Token = ""
    let count = 0;
    while (count < length) {
        if (isNumericalLiteral(expression[count])) buffer! += expression[count]
        else if (isUnaryOperation(expression[count]) && (isUnaryOperation(buffer[buffer.length-1]) || buffer ==="")) buffer += expression[count]
        else {
            if (buffer != "") tokens.push(buffer as Token)
            tokens.push(expression[count] as Token)
            buffer = ""
        }
        count++
    }
    if (buffer != "") tokens.push(buffer as Token)
    return tokens
}