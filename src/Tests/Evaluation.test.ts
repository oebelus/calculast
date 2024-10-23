import { AST } from "../AST";
import { rpnEvaluator } from "../RPNEvaluator";
import { ShuntingYard } from "../ShuntingYard";
import { tokenizer } from "../Tokeniser";

describe("Expression Evaluation Tests", () => {
  test("Simple addition", () => {
    const input = "2 + 3";
    const rpn = ShuntingYard(tokenizer(input));
    const rpnResult = rpnEvaluator(rpn);

    const ast = new AST();
    ast.Add(rpn);
    const astResult = ast.root && ast.Collapse(ast.root);

    expect(rpnResult).toBe("5");
    expect(astResult).toBe("5");
  });

  test("Unary minus handling", () => {
    const input = "-5 + 10";
    const rpn = ShuntingYard(tokenizer(input));
    const rpnResult = rpnEvaluator(rpn);

    const ast = new AST();
    ast.Add(rpn);
    const astResult = ast.root && ast.Collapse(ast.root);

    expect(rpnResult).toBe("5");
    expect(astResult).toBe("5");
  });

  test("Binary minus handling", () => {
    const input = "10 - 3";
    const rpn = ShuntingYard(tokenizer(input));
    const rpnResult = rpnEvaluator(rpn);

    const ast = new AST();
    ast.Add(rpn);
    const astResult = ast.root && ast.Collapse(ast.root);

    expect(rpnResult).toBe("7");
    expect(astResult).toBe("7");
  });

  test("Parentheses and precedence", () => {
    const input = "3 + (2 * 4)";
    const rpn = ShuntingYard(tokenizer(input));
    const rpnResult = rpnEvaluator(rpn);

    const ast = new AST();
    ast.Add(rpn);
    const astResult = ast.root && ast.Collapse(ast.root);

    expect(rpnResult).toBe("11");
    expect(astResult).toBe("11");
  });

  test("Complex expression with multiple operations", () => {
    const input = "10 - 2 * (3 + 4)";
    const rpn = ShuntingYard(tokenizer(input));
    const rpnResult = rpnEvaluator(rpn);

    const ast = new AST();
    ast.Add(rpn);
    const astResult = ast.root && ast.Collapse(ast.root);

    expect(rpnResult).toBe("-4");
    expect(astResult).toBe("-4");
  });

  test("Nested parentheses", () => {
    const input = "3 * (4 + (5 - 2))";
    const rpn = ShuntingYard(tokenizer(input));
    const rpnResult = rpnEvaluator(rpn);

    const ast = new AST();
    ast.Add(rpn);
    const astResult = ast.root && ast.Collapse(ast.root);

    expect(rpnResult).toBe("21");
    expect(astResult).toBe("21");
  });
});
