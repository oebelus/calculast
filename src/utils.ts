import { Binary, NumericLiteral, Operation, Token, TokenType } from "./Types";

export const isBinaryOperation = (token: Token): boolean => {
  return token.type == TokenType.Binary;
};

export const minusIsUnary = (prevToken: Token): boolean => {
  if (!prevToken) return true;

  return !(
    prevToken.type === TokenType.Number ||
    prevToken.type === TokenType.RightParenthesis
  );
};

export const isUnaryOperation = (token: Token): boolean => {
  return token.type == TokenType.Unary;
};

export const isNumericalLiteral = (token: Token): boolean => {
  return token.type == TokenType.Number;
};

export const isNumber = (char: string): boolean => {
  return char >= "0" && char <= "9";
};

export const isAlpha = (char: string): boolean => {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
};

export const isRightAssociative = (token: Token): boolean => {
  return token.value == "**";
};

export const isFunction = (s: string): boolean => {
  return s == "sin" || s == "cos" || s == "tan" || s == "sqrt";
};

export function Addition(x: NumericLiteral, y: NumericLiteral): NumericLiteral {
  return `${parseFloat(x) + parseFloat(y)}`;
}

export function Multiplication(
  x: NumericLiteral,
  y: NumericLiteral
): NumericLiteral {
  return `${parseFloat(x) * parseFloat(y)}`;
}

export function Division(x: NumericLiteral, y: NumericLiteral): NumericLiteral {
  return `${parseFloat(x) / parseFloat(y)}`;
}

export function Substraction(
  x: NumericLiteral,
  y: NumericLiteral
): NumericLiteral {
  return `${parseFloat(x) - parseFloat(y)}`;
}

export function Negation(x: NumericLiteral): NumericLiteral {
  return `${-x}`;
}

export function Exponentiation(
  x: NumericLiteral,
  y: NumericLiteral
): NumericLiteral {
  return `${Math.pow(parseFloat(x), parseFloat(y))}`;
}

export function Factorial(x: NumericLiteral): NumericLiteral {
  let y = parseFloat(x);
  if (y <= 1) return "1";
  return `${y * parseFloat(Factorial(`${y - 1}`))}`;
}

export function Sine(x: NumericLiteral): NumericLiteral {
  return `${Math.sin(parseFloat(x))}`;
}

export function Cosine(x: NumericLiteral): NumericLiteral {
  return `${Math.cos(parseFloat(x))}`;
}

export function Tangent(x: NumericLiteral): NumericLiteral {
  return `${Math.tan(parseFloat(x))}`;
}

export function Sqrt(x: NumericLiteral): NumericLiteral {
  return `${Math.sqrt(parseFloat(x))}`;
}

export const binaryOperations: Record<
  Binary,
  (x: NumericLiteral, y: NumericLiteral) => NumericLiteral
> = {
  "+": Addition,
  "-": Substraction,
  "/": Division,
  "*": Multiplication,
  "**": Exponentiation,
};

export const unaryOperations = {
  "!": Factorial,
  sin: Sine,
  cos: Cosine,
  tan: Tangent,
  "-": Negation,
  sqrt: (x: NumericLiteral) => `${Math.sqrt(parseFloat(x))}`,
};

export const precedence: Record<Operation, number> = {
  "+": 0,
  "-": 0,
  "*": 1,
  "/": 1,
  "!": 2,
  "**": 3,
  sin: 4,
  cos: 4,
  tan: 4,
};

export function tokensToArray(tokens: Token[]): string[] {
  let result: string[] = [];
  for (let i = 0; i < tokens.length; i++) {
    result.push(tokens[i].value);
  }
  return result;
}
