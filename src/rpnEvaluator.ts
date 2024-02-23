import { BinaryOperation, NumericLiteral, UnaryOperation } from "./types"
import { binaryOperations, isBinaryOperation, isNumericalLiteral, isUnaryOperation, unaryOperations } from "./utils"

// Reverse Polish Notation Evaluator
export function rpnEvaluator(rps: string[]): number { 
    let stack: string[] = []
    let shifted = rps.shift()
    stack.push(shifted!)
    for (let i = 0; i < rps.length + 1; i++) {
        if (isNumericalLiteral(rps[i])) {
            stack.push(rps[i])
        }
        else {
            if (isBinaryOperation(rps[i]) && rps[i] !== '!') { 
                    let acc = binaryOperations[rps[i] as BinaryOperation](stack[stack.length-2] as NumericLiteral, stack[stack.length-1] as NumericLiteral) as string
                    stack.pop()
                    stack.pop()
                    stack.push(acc)
                    acc = ""
            } else if (isUnaryOperation(rps[i])) {
                let acc = unaryOperations[rps[i] as UnaryOperation](stack[stack.length-1] as NumericLiteral)
                stack.pop()
                stack.push(acc)
                acc = "" as NumericLiteral
            }
        }
   }
   return stack.length === 1 ? parseFloat(stack[0]) : parseFloat(unaryOperations[stack[0] as UnaryOperation](stack[1] as NumericLiteral))
}