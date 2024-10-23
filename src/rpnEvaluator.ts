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

// Reverse Polish Notation Evaluator
export function rpnEvaluator(rps: Token[]): NumericLiteral {
  if (rps.length === 0) return "0";

  let stack: string[] = [];

  let acc = "";

  for (let i = 0; i < rps.length; i++) {
    const token = rps[i];

    if (token.type === TokenType.Number) {
      stack.push(token.value);
    } else {
      if (isBinaryOperation(token)) {
        let right = stack.pop() as NumericLiteral;
        let left = stack.pop() as NumericLiteral;
        let operation = token.value as Binary;

        acc = binaryOperations[operation](left, right);

        stack.push(acc);
      } else if (isUnaryOperation(token)) {
        let operand = stack.pop() as NumericLiteral;
        let operation = token.value as UnaryOperation;

        let acc = unaryOperations[operation](operand);

        stack.push(acc);
      }
      acc = "";
    }
  }

  return stack.length === 1
    ? (stack[0] as NumericLiteral)
    : (unaryOperations[rps[rps.length - 1].value as UnaryOperation](
        stack[1] as NumericLiteral
      ) as NumericLiteral);
}
