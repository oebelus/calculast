import {
  Binary,
  NumericLiteral,
  Operation,
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

class aNode {
  type: TokenType;
  value: string;
  left: aNode | undefined;
  right: aNode | undefined;

  constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = value;
    this.left = undefined;
    this.right = undefined;
  }
}

export class AST {
  root: aNode | undefined;

  constructor() {
    this.root = undefined;
  }

  Add(rpn: Token[]): aNode {
    let length = rpn.length;
    let stack: aNode[] = [];

    for (let i = 0; i < length; i++) {
      let token = rpn[i];
      let node = new aNode(token.type, token.value);

      if (isUnaryOperation(token)) {
        let rightNode = stack.pop();

        if (!rightNode) {
          throw new Error(
            `Unary operation "${token.value}" requires one operand.`
          );
        }

        node.right = rightNode;
        stack.push(node);
      } else if (isBinaryOperation(token)) {
        let rightNode = stack.pop();
        let leftNode = stack.pop();

        if (!rightNode || !leftNode) {
          throw new Error(
            `Binary operation "${token.value}" requires two operands.`
          );
        }

        node.right = rightNode;
        node.left = leftNode;
        stack.push(node);
      } else if (isNumericalLiteral(token)) {
        stack.push(node);
      } else {
        throw new Error(`Unknown operation: ${token.value}`);
      }
    }

    this.root = stack[0];
    return this.root;
  }
  Collapse(root: aNode): NumericLiteral {
    let current: aNode = root;

    if (isNumericalLiteral(current)) {
      return current.value as NumericLiteral;
    } else if (isBinaryOperation(current)) {
      if (!current.left || !current.right) {
        throw new Error(
          `Binary operation "${current.value}" is missing operands`
        );
      }
      return binaryOperations[current.value as Binary](
        this.Collapse(current.left!) as NumericLiteral,
        this.Collapse(current.right!) as NumericLiteral
      );
    } else if (isUnaryOperation(current)) {
      if (!current.right) {
        throw new Error(
          `Unary operation "${current.value}" is missing operand`
        );
      }
      return unaryOperations[current.value as UnaryOperation](
        this.Collapse(current.right)
      );
    }
    throw new Error(`Unknown operation: ${current.value}`);
  }
}
