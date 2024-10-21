export type Binary = `${'+' | '/' | '*' | '-' | '^'}`
export type UnaryOperation = `${'!' | 'sin' | 'cos' | 'tan'}`
export type NumericLiteral = `${number}`
export type Parenthesis = `${'(' | ')'}`

export type Operation = Binary | UnaryOperation
export enum TokenType { Binary, Unary, Minus, LeftParenthesis, RightParenthesis, Number };

export type Token = {
    type: TokenType
    value: string
}