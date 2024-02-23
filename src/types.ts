export type BinaryOperation = `${'+' | '/' | '*' | '-' | '^'}`
export type UnaryOperation = `${'!' | 'sin' | 'cos' | 'tan'}`
export type NumericLiteral = `${number}`
export type Parenthese = `${'(' | ')'}`

export type Operation = BinaryOperation | UnaryOperation
export type Token = BinaryOperation | UnaryOperation | NumericLiteral | Parenthese | ""