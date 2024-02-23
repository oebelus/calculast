import { NumericLiteral, Operation } from "./types";

export const isBinaryOperation = (char: string): boolean => {
    return '+-*/^!'.includes(char);
};

export const isNumericalLiteral = (char: string): boolean => {
    return !isNaN(parseInt(char))
}

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

function Exponentiation(x: NumericLiteral, y: NumericLiteral): NumericLiteral {
    return `${Math.pow(parseInt(x), parseInt(y))}`
}

function Factorial(x: NumericLiteral): NumericLiteral {
    let y = parseInt(x)
    if (y <= 1) return '1'; 
    return `${y * parseInt(Factorial(`${y - 1}`))}`;
}

export const operations: Record<Operation, (x: NumericLiteral, y:NumericLiteral) => NumericLiteral> = {
    "+": Addition,
    "-": Substraction,
    "/": Division,
    "*": Multiplication,
    "!": Factorial,
    "^": Exponentiation
}

export const precedence: Record<Operation, number> = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1,
    '!': 2,
    '^': 3
}