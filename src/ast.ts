import { NumericLiteral, Operation } from "./types"
import { isBinaryOperation, isNumericalLiteral, operations } from "./utils"

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

export class AST {
    root: aNode | undefined

    constructor() {
        this.root = undefined
    }

    Add(rpn: string[]): aNode {
        rpn = rpn.reverse()
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
