import {
  Binary,
  NumericLiteral,
  Token,
  TokenType,
  UnaryOperation,
} from "./Types";
import {
  binaryOperations,
  isBinaryOperation,
  isNumericalLiteral,
  isUnaryOperation,
  unaryOperations,
} from "./Utils";

class ASTNode {
  type: TokenType;
  value: string;
  left: ASTNode | undefined;
  right: ASTNode | undefined;

  constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = value;
    this.left = undefined;
    this.right = undefined;
  }
}

export class AST {
  root: ASTNode | undefined;

  constructor() {
    this.root = undefined;
  }

  Add(rpn: Token[]): ASTNode {
    let stack: ASTNode[] = [];
    rpn = rpn.reverse();
    let current = this.root;

    for (const token of rpn) {
      let node = new ASTNode(token.type, token.value);
      if (isBinaryOperation(token)) {
        if (!this.root) {
          this.root = node;
          current = this.root;
          stack.push(node);
        } else {
          while (
            current &&
            (isNumericalLiteral(current) ||
              (isUnaryOperation(current) && current.right))
          ) {
            current = stack.pop();
          }
          if (current && !current.right) {
            current.right = node;
            current = current.right;
          } else if (current && !current.left && !isUnaryOperation(current)) {
            current.left = node;
            current = current.left;
          }
          current && stack.push(current);
        }
      } else if (isUnaryOperation(token)) {
        if (!this.root) {
          this.root = node;
          current = this.root;
          stack.push(node);
        } else {
          while (
            current &&
            (isNumericalLiteral(current) ||
              (isUnaryOperation(current) && current.right))
          ) {
            current = stack.pop();
          }
          if (current && !current.right) {
            current.right = node;
            current = current.right;
          } else if (
            current &&
            (!current.left || (!isUnaryOperation(current) && current.right))
          ) {
            current.left = node;
            current = current.left;
          }
          current && stack.push(current);
        }
      } else if (isNumericalLiteral(token)) {
        if (!this.root) {
          this.root = node;
          current = this.root;
          stack.push(node);
        } else {
          while (current && isNumericalLiteral(current)) {
            current = stack.pop();
          }
          if (current && !current.right) {
            current.right = node;
            current = current.right;
          } else if (
            current &&
            (!current.left || (!isUnaryOperation(current) && current.right))
          ) {
            current.left = node;
            current = current.left;
          }
          current && stack.push(current);
        }
      } else {
        throw new Error(`Unexpected token: ${token.value}`);
      }
    }
    return this.root ?? new ASTNode(TokenType.Number, "0");
  }
  Collapse(root: ASTNode): NumericLiteral {
    let current: ASTNode = root;
    if (isNumericalLiteral(current)) {
      return current.value as NumericLiteral;
    } else {
      return isBinaryOperation(current)
        ? binaryOperations[current.value as Binary](
            this.Collapse(current.left!) as NumericLiteral,
            this.Collapse(current.right!) as NumericLiteral
          )
        : unaryOperations[current.value as UnaryOperation](
            this.Collapse(current.right!)
          );
    }
  }

  Print(): void {
    if (this.root) console.log(this.PrintNode(this.root, 0));
  }

  private PrintNode(node: ASTNode, level: number): void {
    if (!node) {
      return;
    }
    let result = "";
    for (let i = 0; i < level; i++) {
      result += "    ";
    }
    console.log(" ".repeat(level) + `${node.type}: ${node.value}`);
    this.PrintNode(node.left!, level + 1);
    this.PrintNode(node.right!, level + 1);
  }
}
