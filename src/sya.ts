function sya(tokens: string[]): string[] { // (5*4+3*)-1
    // "(5*4+3*)-1" -> 5 4 * 3 * + 1 - 
    let op_stack:string[] = []
    let queue: string[] = []
    while (tokens.length > 0) {
        let head = tokens.shift()
        if (new RegExp(types["BinaryOperation"]).test(head!)) {
            if ((head === '*' || head === '/') && (op_stack[op_stack.length-1] === "+" || op_stack[op_stack.length-1] === "-")) {
                op_stack.push(head)
            }
            else if ((head === '+' || head === '-') && (op_stack[op_stack.length-1] === "*" || op_stack[op_stack.length-1] === "/")) {
                queue.push(op_stack.pop()!)
                op_stack.push(head)
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
        else if (new RegExp(types["NumericLiteral"]).test(head!)) queue.push(head!)
        else if (head == '(') op_stack.push(head)
        else if (head == ')') {
            console.log("AAA")
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

console.log(sya(tokens).join(""))
