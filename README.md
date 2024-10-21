# Mathematical Expression Evaluator (A fancy way to say Calculator)

This TypeScript program evaluates a mathematical expression in infix notation and returns the result. It supports binary operations (+, -, \*, /, ^) for basic arithmetic calculations, and some unary operations (!, sin, cos, tan).<br><br> -> The program converts the infix expression to Reverse Polish Notation (RPN) using the Shunting Yard Algorithm and then evaluates it either by constructing an Abstract Syntax Tree (AST) and collapsing the tree or by using stack calculations.

## Functions

### [Tokenizer](./src/Tokeniser.ts)

The tokenizer function parses the input expression into individual tokens, such as operators, numeric literals, and Parenthesiss.

### [Shunting Yard Algorithm](./src/ShuntingYard.ts)

The sya function converts the infix expression into Reverse Polish Notation (RPN) using the Shunting Yard Algorithm. This algorithm handles operator precedence and associativity.

### RPN Evaluation with AST

1. [AST](./src/AST.ts)
   This function evaluates the RPN expression by constructing an Abstract Syntax Tree (AST) and collapsing the tree to compute the final result.

2. [Stack Calculation](./src/RPNEvaluator)
   This function evaluates the RPN expression using stack based calculations.

## How is it used?

The program prompts you for a mathematical expression:

```
Enter a mathematical expression:
>> 4+5-3!*10*tan(5)^10
```

It then outputs its Reverse Polish Notation and evaluates it with both AST
and Stack Based calculations:

```
The Reverse Polish Notation of your expression:  4 5 + 3 ! 10 * 5 tan 10 ^ * -
Result from AST evaluation: -11694444.508011641
Result from RPN evaluation using stack calculation: -11694444.508011641
```

### Tests

There are tests for the [AST](./src/Tests/Ast.test.ts) calculations, the [RPN evaluation](./src/Tests/RpnEvaluation.test.ts) and the [Shunting Yard Algorithm](./src/Tests/ShuntingYard.test.ts).
