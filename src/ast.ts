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

let rpn = sya(tokens)

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

let rpn_tree = rpn.reverse()

class aNode {
    //type: string
    value: string
    left: aNode | undefined
    right: aNode | undefined

    constructor(/*type: string, */value: string) {
        //this.type = type
        this.value = value
        this.left = undefined
        this.right = undefined
    }
}

class AST {
    root: aNode | undefined

    constructor() {
        this.root = undefined
    }

    Add(rpn: string[]): aNode {
        let length = rpn.length
        let current = this.root
        let stack: aNode[] = []
        
        for (let i = 0; i < length; i++) {
            let node = new aNode(rpn[i])

            if (isBinaryOperation(rpn[i])) {
                if (!this.root) {
                    this.root = node
                    current = this.root
                    stack.push(current)
                } else {
                    if (isNumericalLiteral(current!.value)) {
                        current = stack.pop()
                    }
                    if (!current!.right) {
                        current!.right = node
                        current = current!.right
                    }
                    else if (!current!.left) {
                        current!.left = node
                        current = current!.left
                    }
                    stack.push(current!)
                }
            } else {
                if (isNumericalLiteral(current!.value)) {
                    current = stack.pop()
                } 
                if (!current!.right) {
                    current!.right = node
                    current = current!.right
                }
                else if (!current!.left) {
                    current!.left = node
                    current = current!.left
                }
            }
        }
        return this.root!
    }
    Collapse(root: aNode): NumericLiteral {
        let current: aNode = root
        if (isNumericalLiteral(current.right!.value) && isNumericalLiteral(current.left!.value)) {
            return operations[current.value as Operation](current.left!.value as NumericLiteral, current.right!.value as NumericLiteral)
        }
        else {
            if (isBinaryOperation(current.left!.value) && isNumericalLiteral(current.right!.value))
                current.value = operations[current.value as Operation](this.Collapse(current.left!) as NumericLiteral, current.right!.value as NumericLiteral)
            else if (isBinaryOperation(current.right!.value) && isNumericalLiteral(current.left!.value))
                current.value = operations[current.value as Operation](current.left!.value as NumericLiteral, this.Collapse(current.right!) as NumericLiteral)
            else if (isBinaryOperation(current.left!.value) && isBinaryOperation(current.right!.value)) 
                current.value = operations[current.value as Operation](this.Collapse(current.left!) as NumericLiteral, this.Collapse(current.right!) as NumericLiteral)
        }
        return current.value as NumericLiteral
    }
}

let ast = new AST()
ast.Add(rpn_tree)
console.log(ast.Collapse(ast.root!))