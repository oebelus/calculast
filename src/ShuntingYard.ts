import { Operation, Token, TokenType } from "./Types";
import {
  isBinaryOperation,
  isNumericalLiteral,
  isRightAssociative,
  isUnaryOperation,
  minusIsUnary,
  precedence,
} from "./Utils";

export function ShuntingYard(tokens: Token[]): Token[] {
  if (tokens.length == 0) return [];

  const operatorStack: Token[] = [];
  const outputQueue: Token[] = [];

  let prevToken: Token | null = null;

  while (tokens.length > 0) {
    let head = tokens.shift();
    if (!head) continue;

    if (head.type == TokenType.Number) {
      outputQueue.push(head);
    } else if (isUnaryOperation(head)) {
      operatorStack.push(head);
    } else if (isBinaryOperation(head)) {
      while (
        operatorStack.length > 0 &&
        // Left-associative: pop if precedence is higher or equal;
        // Right-associative: pop if precedence is higher
        (precedence[
          operatorStack[operatorStack.length - 1].value as Operation
        ] > precedence[head.value as Operation] ||
          (!isRightAssociative(head) &&
            precedence[
              operatorStack[operatorStack.length - 1].value as Operation
            ] === precedence[head.value as Operation]))
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.push(head);
    } else if (head.type == TokenType.Minus) {
      if (prevToken == null || minusIsUnary(prevToken)) {
        head.type = TokenType.Unary;
        //console.log(head, prevToken, minusIsUnary(prevToken!));
        operatorStack.push(head);
      } else {
        head.type = TokenType.Binary;
        //console.log(head, prevToken, minusIsUnary(prevToken!));

        while (
          operatorStack.length > 0 &&
          precedence[
            operatorStack[operatorStack.length - 1].value as Operation
          ] >= precedence[head.value as Operation]
        ) {
          outputQueue.push(operatorStack.pop()!);
        }
        operatorStack.push(head);
      }
    } else if (head.type === TokenType.LeftParenthesis) {
      operatorStack.push(head);
    } else if (head.type === TokenType.RightParenthesis) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1].type !==
          TokenType.LeftParenthesis
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      if (operatorStack.length === 0) {
        throw new Error("Mismatched Parenthesis.");
      }
      operatorStack.pop();
    } else {
      throw new Error(`Unknown token: ${head}`);
    }

    prevToken = head;
  }

  while (operatorStack.length > 0) {
    const top = operatorStack[operatorStack.length - 1];
    if (top.type == TokenType.LeftParenthesis) {
      throw new Error("Mismatched Parenthesis.");
    }
    outputQueue.push(operatorStack.pop()!);
  }
  return outputQueue;
}
