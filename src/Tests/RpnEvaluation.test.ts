import { Token, TokenType, UnaryOperation, Binary } from "../Types";
import { rpnEvaluator } from "../RPNEvaluator";

describe("rpnEvaluator", () => {
  it("should evaluate a simple addition in RPN", () => {
    const tokens: Token[] = [
      { type: TokenType.Number, value: "3" },
      { type: TokenType.Number, value: "4" },
      { type: TokenType.Binary, value: "+" },
    ];

    const result = rpnEvaluator(tokens);
    expect(result).toEqual("7");
  });

  it("should evaluate a simple subtraction in RPN", () => {
    const tokens: Token[] = [
      { type: TokenType.Number, value: "10" },
      { type: TokenType.Number, value: "4" },
      { type: TokenType.Binary, value: "-" },
    ];

    const result = rpnEvaluator(tokens);
    expect(result).toEqual("6");
  });

  it("should evaluate a simple multiplication in RPN", () => {
    const tokens: Token[] = [
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Number, value: "5" },
      { type: TokenType.Binary, value: "*" },
    ];

    const result = rpnEvaluator(tokens);
    expect(result).toEqual("10");
  });

  it("should evaluate a complex expression in RPN", () => {
    const tokens: Token[] = [
      { type: TokenType.Number, value: "5" },
      { type: TokenType.Number, value: "1" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Binary, value: "+" },
      { type: TokenType.Binary, value: "*" },
      { type: TokenType.Number, value: "4" },
      { type: TokenType.Binary, value: "+" },
    ];

    const result = rpnEvaluator(tokens);
    expect(result).toEqual("19");
  });

  it("should evaluate a unary operation in RPN", () => {
    const tokens: Token[] = [
      { type: TokenType.Number, value: "9" },
      { type: TokenType.Unary, value: "sqrt" },
    ];

    const result = rpnEvaluator(tokens);
    expect(result).toEqual("3"); // sqrt(9) = 3
  });

  it("should evaluate a mixed unary and binary operation in RPN", () => {
    const tokens: Token[] = [
      { type: TokenType.Number, value: "16" },
      { type: TokenType.Unary, value: "sqrt" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Binary, value: "*" },
    ];

    const result = rpnEvaluator(tokens);
    expect(result).toEqual("8"); // sqrt(16) * 2 = 8
  });

  it("should handle division in RPN", () => {
    const tokens: Token[] = [
      { type: TokenType.Number, value: "10" },
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Binary, value: "/" },
    ];

    const result = rpnEvaluator(tokens);
    expect(result).toEqual("5");
  });

  it("should evaluate an expression with right-associative operator in RPN", () => {
    const tokens: Token[] = [
      { type: TokenType.Number, value: "2" },
      { type: TokenType.Number, value: "3" },
      { type: TokenType.Number, value: "4" },
      { type: TokenType.Binary, value: "**" },
      { type: TokenType.Binary, value: "**" },
    ];

    const result = rpnEvaluator(tokens);
    expect(result).toEqual((2 ** (3 ** 4)).toString()); // 2^(3^4)
  });

  it("should return 0 for empty input", () => {
    const tokens: Token[] = [];
    const result = rpnEvaluator(tokens);
    expect(result).toEqual("0");
  });
});
