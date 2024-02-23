export type Operation = `${'+' | '/' | '*' | '-' | '!' | '^'}`
export type NumericLiteral = `${number}`
export type Parenthese = `${'(' | ')'}`

export type Token = Operation | NumericLiteral | Parenthese | ""