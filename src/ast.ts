/*
    digits (terminal symbols): /\d+/
    operations: /[\+*-/]/
    parentheses: /[()]/

    Rules:
        - The "*" and "/" come before "+" and "-"
        - The elements inside the parenthesis are evaluated first
*/

const expression: string = "7*365+11-55"

type BinaryOperation = `${'+' | '/' | '*' | '-'}`
type NumericLiteral = `${number}`
type Parenthese = `${'(' | ')'}`

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

const binaryOperations: Record<BinaryOperation, (x: NumericLiteral, y:NumericLiteral) => NumericLiteral> = {
    "+": Addition,
    "-": Substraction,
    "/": Division,
    "*": Multiplication
}

let types: Record<string, RegExp> = {
    "BinaryOperation": /[\+\*-/]/,
    "NumericLiteral":  /\d+/,
    "Parenthese": /[()]/
}

let exp = expression.replaceAll(" ", "")

function tokenizer(expression: string): string[] {
    let tokens: string[] = [];
    let length: number = expression.length
    let buffer: string = ""
    let count = 0;
    while (count < length) {
        if (new RegExp(/^\d+/).test(expression[count])) buffer += expression[count]
        else {
            if (buffer != "") tokens.push(buffer)
            tokens.push(expression[count])
            buffer = ""
        }
        count++
    }
    if (buffer != "") tokens.push(buffer)
    return tokens
}

const tokens = tokenizer(exp)

/* Rules:
    Interior nodes: operations
    Leaves : operands

    Expression: \d+
*/

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

    Add(expression: string[]): aNode {
        let length = expression.length
        let current = this.root
        let stack: aNode[] = []
        
        for (let i = 0; i < length; i++) {
            let node = new aNode(expression[i])
            
            if (new RegExp(/^\d+/).test(expression[i])) stack.push(node)
            
            else {
                if (this.root == undefined) {
                    this.root = node
                    node.left = stack.pop()
                    current = this.root
                }
                else {
                    if (current) { 
                        current.right = node
                        node.left = stack.pop()
                        current = current.right
                    }
                }
            }
        }
        if (current) current.right = stack.pop()
        return this.root? this.root : new aNode("5")
    }

    dfs(node:aNode) {
        console.log(node.value) 
        if (node.left) this.dfs(node.left)
        if (node.right) this.dfs(node.right)
    }

    Collapse(root: aNode): NumericLiteral {
        let current: aNode = root
        if (current.right && current.left) {
            if (new RegExp(types["NumericLiteral"]).test(current.right.value)) {
                return binaryOperations[current.value as BinaryOperation](current.left.value as NumericLiteral, current.right.value as NumericLiteral)
                
            }
            else {
                current.value = binaryOperations[current.value as BinaryOperation](current.left.value as NumericLiteral, this.Collapse(current.right) as NumericLiteral)
            }
        }
        return current.value as NumericLiteral
    }
}

// 2511
let ast = new AST()
ast.Add(tokens)
if (ast.root) console.log(ast.Collapse(ast.root))