import { NumericLiteral, Operation } from "./types"
import { isBinaryOperation, isNumericalLiteral, operations } from "./utils"

// Reverse Polish Notation Evaluator
export function rpnEvaluator(rps: string[]): number { 
    let stack: string[] = []
    let popped = rps.pop()
    stack.push(popped!)
    for (let i = 0; i < rps.length; i++) {
        if (isNumericalLiteral(rps[i])) {
            stack.push(rps[i])
        }
        else {
            if (isBinaryOperation(rps[i])) { 
                let acc = operations[rps[i] as Operation](stack[stack.length-2] as NumericLiteral, stack[stack.length-1] as NumericLiteral) as string
                stack.pop()
                stack.pop()
                stack.push(acc)
                acc = ""
            }
            else {
                stack.push(rps[i])
            }
        }
   }
   return parseInt(operations[stack[0] as Operation](stack[1] as NumericLiteral, stack[2] as NumericLiteral) as string)
}
