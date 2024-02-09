/*
    digits (terminal symbols): /\d+/
    operations: /[\+*-/]/
    parentheses: /[()]/

    Rules:
        - The "*" and "/" come before "+" and "-"
        - The elements inside the parenthesis are evaluated first
*/

const expression: string = "7+345*4+11"
const types: string[] = ["BinaryOperation", "NumericLiteral", "Parenthese"]

let dictionary: Record<string, RegExp> = {
    "BinaryOperation": /[\+*-/]/,
    "NumericLiteral":  /\d+/,
    "Parenthese": /[()]/
}

let str = "+2545++55"
console.log(new RegExp(/^\d+/).test(str))

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
    tokens.push(buffer)
    return tokens
}

const tokens = tokenizer(expression)

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
        let popped: aNode | undefined;
        
        for (let i = 0; i < length; i++) {
            let node = new aNode(expression[i])
            
            if (new RegExp(/^\d+/).test(expression[i])) stack.push(node)
            
            else {
                if (this.root == undefined) {
                    this.root = node
                    let popped = stack.pop()
                    if (popped) node.left = popped
                    current = this.root
                }
                else {
                    if (current) { 
                        current.right = node
                        popped = stack.pop()
                        node.left = popped
                        current = current.right
                    }
                }
            }
        }
        if (current) current.right = stack.pop()
        return this.root? this.root : new aNode("5")
    }
}


let ast = new AST()
ast.Add(tokens)
console.log(ast)



/*let pattern = /[()]/
let digit = ')'
let match = pattern.test(digit)
console.log(match)*/
