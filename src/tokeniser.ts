import { Token, TokenType } from "./Types";
import { isAlpha, isNumber, isNumericalLiteral, isFunction } from "./Utils";

export function tokenizer(expression: string): Token[] {
    let tokens: Token[] = [];
    let length: number = expression.length
    let buffer: string = ""
    let count = 0;

    while (count < length) {
        let current: Token; 

        switch (expression[count]) {
            case " ":
                count++
                break;
            case "\t":
                count++
                break;
            case "\n":
                count++
                break;
            case "(":
                current = 
                {
                    type: TokenType.LeftParenthesis,
                    value: expression[count]
                }
                tokens.push(current)
                count++
                break;
            case ")":
                current = 
                {
                    type: TokenType.RightParenthesis,
                    value: expression[count]
                }
                tokens.push(current)
                count++
                break;
            case "+":
            case "%":
            case "*":
            case "/":
            case "^":
                current = 
                {
                    type: TokenType.Binary,
                    value: expression[count]
                }
                tokens.push(current)
                count++
                break;
            case "-":
                current = 
                {
                    type: TokenType.Minus,
                    value: expression[count]
                }
                tokens.push(current)
                count++
                break;
            case "!":
                current = 
                {
                    type: TokenType.Unary,
                    value: expression[count]
                }
                tokens.push(current)
                count++
                break;
            default:
                if (isNumber(expression[count])) {
                    while (isNumber(expression[count])) {
                        buffer += expression[count]
                        count++
                    }
                    let current = 
                    {
                        type: TokenType.Number,
                        value: buffer
                    }
                    tokens.push(current)
                    buffer = ""
                } else if (isAlpha(expression[count])) {
                    while (isAlpha(expression[count])) {
                        buffer += expression[count]
                        count++
                    }
                    if (isFunction(buffer)) {
                        current = 
                        {
                            type: TokenType.Unary,
                            value: buffer
                        }
                    }
                    else if (buffer == "pi")
                    {
                        current = 
                        {
                            type: TokenType.Number,
                            value: Math.PI.toString()
                        }
                    } else
                    {
                        throw new Error(`Unknown operation: ${buffer}`);
                    }
                    
                    tokens.push(current)
                    buffer = ""
                }
                else count++;
        }
    }
    return tokens
}