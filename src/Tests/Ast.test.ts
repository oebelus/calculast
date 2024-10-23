import { AST } from "../AST";
import { Token, TokenType } from "../Types";

const numberToken = (value: string): Token => ({
  type: TokenType.Number,
  value,
});
const binaryToken = (value: string): Token => ({
  type: TokenType.Binary,
  value,
});
const unaryToken = (value: string): Token => ({ type: TokenType.Unary, value });

describe("AST", () => {
  let ast: AST;

  beforeEach(() => {
    ast = new AST();
  });

  // Test for Add method (building the AST)
  it("should correctly build AST for binary addition", () => {
    const rpn: Token[] = [numberToken("3"), numberToken("4"), binaryToken("+")];

    const rootNode = ast.Add(rpn);
    expect(rootNode.value).toBe("+");
    expect(rootNode.left?.value).toBe("3");
    expect(rootNode.right?.value).toBe("4");
  });

  it("should correctly build AST for unary minus", () => {
    const rpn: Token[] = [numberToken("5"), unaryToken("-")];

    const rootNode = ast.Add(rpn);
    expect(rootNode.value).toBe("-");
    expect(rootNode.right?.value).toBe("5");
  });

  // Test for Collapse method (evaluating the AST)
  it("should correctly evaluate AST for binary addition", () => {
    const rpn: Token[] = [numberToken("3"), numberToken("4"), binaryToken("+")];

    const rootNode = ast.Add(rpn);
    const result = ast.Collapse(rootNode);
    expect(result).toBe("7");
  });

  it("should correctly evaluate AST for unary minus", () => {
    const rpn: Token[] = [numberToken("5"), unaryToken("-")];

    const rootNode = ast.Add(rpn);
    const result = ast.Collapse(rootNode);
    expect(result).toBe("-5");
  });
});
