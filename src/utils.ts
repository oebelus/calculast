import { BinaryOperation, NumericLiteral, Operation, UnaryOperation } from "./types";

export const isBinaryOperation = (char: string): boolean => {
    return '+-*/^'.includes(char);
};

export const isUnaryOperation = (char: string): boolean => {
    return '!sincostan'.includes(char);
};

export const isNumericalLiteral = (char: string): boolean => {
    return !isNaN(parseInt(char))
}

export function Addition(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseInt(x) + parseInt(y)}`;
}

export function Multiplication(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseInt(x) * parseInt(y)}`;
}

export function Division(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseInt(x) / parseInt(y)}`;
}

export function Substraction(x: NumericLiteral, y:NumericLiteral): NumericLiteral {
    return `${parseInt(x) - parseInt(y)}`;
}

export function Exponentiation(x: NumericLiteral, y: NumericLiteral): NumericLiteral {
    return `${Math.pow(parseInt(x), parseInt(y))}`
}

export function Factorial(x: NumericLiteral): NumericLiteral {
    let y = parseInt(x)
    if (y <= 1) return '1'; 
    return `${y * parseInt(Factorial(`${y - 1}`))}`;
}

export function Sine(x: NumericLiteral): NumericLiteral {
    return `${Math.sin(parseInt(x))}`
}

export function Cosine(x: NumericLiteral): NumericLiteral {
    return `${Math.cos(parseInt(x))}`
}

export function Tangent(x: NumericLiteral): NumericLiteral {
    return `${Math.tan(parseInt(x))}`
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