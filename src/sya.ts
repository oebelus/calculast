import { Operation, Token } from "./types"
import { isBinaryOperation, isNumericalLiteral, precedence } from "./utils"

export function sya(tokens: Token[]): string[] {
    let op_stack:string[] = []
    let queue: string[] = []
    while (tokens.length > 0) {
        let head = tokens.shift()
        if (isBinaryOperation(head!)) {
            if (precedence[head as Operation] > precedence[op_stack[op_stack.length-1] as Operation]) {
                op_stack.push(head!)
            }
            else if (precedence[head as Operation] <= precedence[op_stack[op_stack.length-1] as Operation]) {
                while (precedence[op_stack[op_stack.length-1] as Operation] >= precedence[head as Operation]) {
                    queue.push(op_stack.pop()!)
                }
                op_stack.push(head!)
            }
            else if (head === '*' && op_stack[op_stack.length-1] === "/") {
                op_stack.push(head)
            }
            else if (head === '/' && op_stack[op_stack.length-1] === "*") {
                queue.push(op_stack.pop()!)
                op_stack.push(head)
            }
            else {
                op_stack.push(head!)
            }
        }
        else if (isNumericalLiteral(head!)) queue.push(head!)
        else if (head == '(') {
            op_stack.push(head)
        }
        else if (head == ')') {
            while (op_stack[op_stack.length-1] != '(') {
                queue.push(op_stack.pop()!)
            }
            op_stack.pop()
        }
    }
    while (op_stack.length > 0) {
        queue.push(op_stack.pop()!)
    }
    return queue
}