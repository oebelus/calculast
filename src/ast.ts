let expression = "4 + 4 * 2 / ( 1 - 5 )" // -> 4 4 2 * 1 5 - / +

type Operation = `${'+' | '/' | '*' | '-' | '!' | '^'}`
type NumericLiteral = `${number}`
type Parenthese = `${'(' | ')'}`

const isBinaryOperation = (char: string): boolean => {
    return '+-*/^!'.includes(char);
};

const isNumericalLiteral = (char: string): boolean => {
    return !isNaN(parseInt(char))
}

function Addition(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseInt(x) + parseInt(y)}`;
}

function Multiplication(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseInt(x) * parseInt(y)}`;
}

function Division(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseInt(x) / parseInt(y)}`;
}

function Substraction(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseInt(x) - parseInt(y)}`;
}

function Exponentiation(x: NumericLiteral, y: NumericLiteral): NumericLiteral {
    return `${Math.pow(parseInt(x), parseInt(y))}`
}

function Factorial(x: NumericLiteral): NumericLiteral {
    let y = parseInt(x)
    if (y <= 1) return '1'; 
    return `${y * parseInt(Factorial(`${y - 1}`))}`;
}

const operations: Record<Operation, (x: NumericLiteral, y:NumericLiteral) => NumericLiteral> = {
    "+": Addition,
    "-": Substraction,
    "/": Division,
    "*": Multiplication,
    "!": Factorial,
    "^": Exponentiation
}

const precedence: Record<Operation, number> = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1,
    '!': 2,
    '^': 3
}

let exp = expression.replaceAll(" ", "")
type Token = Operation | NumericLiteral | Parenthese | ""

function tokenizer(expression: string): Token[] {
    let tokens: Token[] = [];
    let length: number = expression.length
    let buffer: Token = ""
    let count = 0;
    while (count < length) {
        if (typeof(expression[count]) == "number") buffer! += expression[count]
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

const tokens = tokenizer(exp)
//console.log(tokens)

function sya(tokens: Token[]): string[] {
    // 3 4 2 × 1 5 − 2 3 ^ ^ / +
    let op_stack:string[] = []
    let queue: string[] = []
    while (tokens.length > 0) {
        let head = tokens.shift()
        if (isBinaryOperation(head!)) {
            if (precedence[head as Operation] > precedence[op_stack[op_stack.length-1] as Operation]) {
                op_stack.push(head!)
            }
            else if (precedence[head as Operation] < precedence[op_stack[op_stack.length-1] as Operation]) {
                queue.push(op_stack.pop()!)
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
        else if (head == '(') op_stack.push(head)
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

//console.log(sya(tokens).join(""))

function rpevaluator(rps: string[]): number { 
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

console.log(rpevaluator(sya(tokens)))