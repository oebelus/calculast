function rpevaluator(rps: string[]): number { 
    let stack: string[] = []
    let popped = rps.pop()
    stack.push(popped!)
    for (let i = 0; i < rps.length; i++) {
        if (new RegExp(types["NumericLiteral"]).test(rps[i])) {
            stack.push(rps[i])
        }
        else {
            if (new RegExp(types["binaryOperations"]).test(rps[i])) { 
                let acc = binaryOperations[rps[i] as BinaryOperation](stack[stack.length-2] as NumericLiteral, stack[stack.length-1] as NumericLiteral) as string
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
   return parseInt(binaryOperations[stack[0] as BinaryOperation](stack[1] as NumericLiteral, stack[2] as NumericLiteral) as string)
}