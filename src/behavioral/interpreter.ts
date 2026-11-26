/**
 * Интерпретатор. Для каждого правила маленького языка есть узел
 * с методом interpret(). Выражение собирается вручную из этих узлов.
 *
 * Выражение бывает числом, именем переменной или суммой двух выражений.
 */
type Variables = ReadonlyMap<string, number>;

interface Expression {
  interpret(variables: Variables): number;
}

class Literal implements Expression {
  constructor(private readonly value: number) {}

  interpret(): number {
    return this.value;
  }
}

class Variable implements Expression {
  constructor(private readonly name: string) {}

  interpret(variables: Variables): number {
    const value = variables.get(this.name);
    if (value === undefined) {
      throw new Error(`Неизвестная переменная: ${this.name}`);
    }
    return value;
  }
}

class Sum implements Expression {
  constructor(
    private readonly left: Expression,
    private readonly right: Expression,
  ) {}

  interpret(variables: Variables): number {
    return this.left.interpret(variables) + this.right.interpret(variables);
  }
}

const expression = new Sum(new Variable("x"), new Sum(new Literal(2), new Literal(3)));
console.log(expression.interpret(new Map([["x", 7]]))); // 12
console.log(expression.interpret(new Map([["x", 10]]))); // 15
