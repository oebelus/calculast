import { ShuntingYard } from '../ShuntingYard';
import { tokenizer } from '../Tokeniser';
import { Token, TokenType } from '../Types';

describe('Calculator Tokenizer', () => {
    test('should tokenize numbers', () => {
        const result = tokenizer('123');
        expect(result).toEqual([
            { type: TokenType.Number, value: '123' }
        ]);
    });

    test('should tokenize basic operators', () => {
        const result = tokenizer('1+2*3');
        expect(result).toEqual([
            { type: TokenType.Number, value: '1' },
            { type: TokenType.Binary, value: '+' },
            { type: TokenType.Number, value: '2' },
            { type: TokenType.Binary, value: '*' },
            { type: TokenType.Number, value: '3' }
        ]);
    });

    test('should tokenize unary operators', () => {
        const result = tokenizer('sin(5)');
        expect(result).toEqual([
            { type: TokenType.Unary, value: 'sin' },
            { type: TokenType.LeftParenthesis, value: '(' },
            { type: TokenType.Number, value: '5' },
            { type: TokenType.RightParenthesis, value: ')' }
        ]);
    });

    test('should tokenize factorial', () => {
        const result = tokenizer('5!');
        expect(result).toEqual([
            { type: TokenType.Number, value: '5' },
            { type: TokenType.Unary, value: '!' }
        ]);
    });

    test('should tokenize complex expression', () => {
        const result = tokenizer('4+5-3!*10*tan(5)^10');
        expect(result).toEqual([
            { type: TokenType.Number, value: '4' },
            { type: TokenType.Binary, value: '+' },
            { type: TokenType.Number, value: '5' },
            { type: TokenType.Minus, value: '-' },
            { type: TokenType.Number, value: '3' },
            { type: TokenType.Unary, value: '!' },
            { type: TokenType.Binary, value: '*' },
            { type: TokenType.Number, value: '10' },
            { type: TokenType.Binary, value: '*' },
            { type: TokenType.Unary, value: 'tan' },
            { type: TokenType.LeftParenthesis, value: '(' },
            { type: TokenType.Number, value: '5' },
            { type: TokenType.RightParenthesis, value: ')' },
            { type: TokenType.Binary, value: '^' },
            { type: TokenType.Number, value: '10' }
        ]);
    });

    test('should handle unary minus', () => {
        const result = tokenizer('-4+5');
        expect(result).toEqual([
            { type: TokenType.Minus, value: '-' },
            { type: TokenType.Number, value: '4' },
            { type: TokenType.Binary, value: '+' },
            { type: TokenType.Number, value: '5' }
        ]);
    });

    test('should handle whitespace', () => {
        const result = tokenizer(' 1 + 2 ');
        expect(result).toEqual([
            { type: TokenType.Number, value: '1' },
            { type: TokenType.Binary, value: '+' },
            { type: TokenType.Number, value: '2' }
        ]);
    });

    test('should handle pi constant', () => {
        const result = tokenizer('pi');
        expect(result).toEqual([
            { type: TokenType.Number, value: Math.PI.toString() }
        ]);
    });

    test('should throw error for unknown operations', () => {
        expect(() => tokenizer('abc')).toThrow('Unknown operation: abc');
    });
});

describe('Shunting Yard Algorithm', () => {
    test('should handle simple addition', () => {
        const tokens = tokenizer('1+2');
        const result = ShuntingYard(tokens);
        expect(result).toEqual([
            { type: TokenType.Number, value: '1' },
            { type: TokenType.Number, value: '2' },
            { type: TokenType.Binary, value: '+' }
        ]);
    });

    test('should handle operator precedence', () => {
        const tokens = tokenizer('1+2*3');
        const result = ShuntingYard(tokens);
        expect(result).toEqual([
            { type: TokenType.Number, value: '1' },
            { type: TokenType.Number, value: '2' },
            { type: TokenType.Number, value: '3' },
            { type: TokenType.Binary, value: '*' },
            { type: TokenType.Binary, value: '+' }
        ]);
    });

    test('should handle Parenthesiss', () => {
        const tokens = tokenizer('(1+2)*3');
        const result = ShuntingYard(tokens);
        expect(result).toEqual([
            { type: TokenType.Number, value: '1' },
            { type: TokenType.Number, value: '2' },
            { type: TokenType.Binary, value: '+' },
            { type: TokenType.Number, value: '3' },
            { type: TokenType.Binary, value: '*' }
        ]);
    });

    test('should handle unary operators', () => {
        const tokens = tokenizer('sin(5)');
        const result = ShuntingYard(tokens);
        expect(result).toEqual([
            { type: TokenType.Number, value: '5' },
            { type: TokenType.Unary, value: 'sin' }
        ]);
    });

    test('should handle factorial', () => {
        const tokens = tokenizer('5!');
        const result = ShuntingYard(tokens);
        expect(result).toEqual([
            { type: TokenType.Number, value: '5' },
            { type: TokenType.Unary, value: '!' }
        ]);
    });

    test('should handle unary minus', () => {
        const tokens = tokenizer('-4+5');
        const result = ShuntingYard(tokens);
        expect(result).toEqual([
            { type: TokenType.Number, value: '4' },
            { type: TokenType.Unary, value: '-' },
            { type: TokenType.Number, value: '5' },
            { type: TokenType.Binary, value: '+' }
        ]);
    });

    test('should handle power operator', () => {
        const tokens = tokenizer('2^3^2');  // Right associative: 2^(3^2)
        const result = ShuntingYard(tokens);
        expect(result).toEqual([
            { type: TokenType.Number, value: '2' },
            { type: TokenType.Number, value: '3' },
            { type: TokenType.Number, value: '2' },
            { type: TokenType.Binary, value: '^' },
            { type: TokenType.Binary, value: '^' }
        ]);
    });

    test('should handle complex expression', () => {
        const tokens = tokenizer('-4+5-3*10*tan(5)^10');
        const result = ShuntingYard(tokens);
        expect(result).toEqual([
            { type: TokenType.Number, value: '4' },
            { type: TokenType.Unary, value: '-' },
            { type: TokenType.Number, value: '5' },
            { type: TokenType.Binary, value: '+' },
            { type: TokenType.Number, value: '3' },
            { type: TokenType.Number, value: '10' },
            { type: TokenType.Binary, value: '*' },
            { type: TokenType.Number, value: '5' },
            { type: TokenType.Unary, value: 'tan' },
            { type: TokenType.Number, value: '10' },
            { type: TokenType.Binary, value: '^' },
            { type: TokenType.Binary, value: '*' },
            { type: TokenType.Binary, value: '-' }
        ]);
    });

    test('should throw error for mismatched Parenthesiss', () => {
        const tokens = tokenizer('(1+2');
        expect(() => ShuntingYard(tokens)).toThrow('Mismatched Parenthesiss');
    });

    test("should return NaN for empty input", () => {
        const tokens: Token[] = [];
        const result = ShuntingYard(tokens);
        expect(result).toEqual([]);
    })
});