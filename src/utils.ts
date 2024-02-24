import { BinaryOperation, NumericLiteral, Operation, UnaryOperation } from "./types";

export const isBinaryOperation = (char: string): boolean => {
    return '+-*/^'.includes(char);
};

export const isUnaryOperation = (char: string): boolean => {
    return '!sincostan'.includes(char);
};

export const isNumericalLiteral = (char: string): boolean => {
    return !isNaN(parseFloat(char))
}

export function Addition(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseFloat(x) + parseFloat(y)}`;
}

export function Multiplication(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseFloat(x) * parseFloat(y)}`;
}

export function Division(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseFloat(x) / parseFloat(y)}`;
}

export function Substraction(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseFloat(x) - parseFloat(y)}`;
}

export function Exponentiation(x: NumericLiteral, y: NumericLiteral): NumericLiteral {
    return `${Math.pow(parseFloat(x), parseFloat(y))}`
}

export function Factorial(x: NumericLiteral): NumericLiteral {
    let y = parseFloat(x)
    if (y <= 1) return '1'; 
    return `${y * parseFloat(Factorial(`${y - 1}`))}`;
}

export function Sine(x: NumericLiteral): NumericLiteral {
    return `${Math.sin(parseFloat(x))}`
}

export function Cosine(x: NumericLiteral): NumericLiteral {
    return `${Math.cos(parseFloat(x))}`
}

export function Tangent(x: NumericLiteral): NumericLiteral {
    return `${Math.tan(parseFloat(x))}`
}

export const binaryOperations: Record<BinaryOperation, (x: NumericLiteral, y:NumericLiteral) => NumericLiteral> = {
    "+": Addition,
    "-": Substraction,
    "/": Division,
    "*": Multiplication,
    "^": Exponentiation
}

export const unaryOperations: Record<UnaryOperation, (x: NumericLiteral) => NumericLiteral> = {
    "!": Factorial,
    "sin": Sine,
    "cos": Cosine,
    "tan": Tangent
}

export const precedence: Record<Operation, number> = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1,
    '!': 2,
    '^': 3,
    'sin': 3,
    'cos': 3,
    'tan': 3
}