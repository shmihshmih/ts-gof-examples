/**
 * Приспособленец. Деревья одного вида ссылаются на одно описание.
 * Конкретные координаты принадлежат дереву и хранятся отдельно.
 */
type TreeKind = Readonly<{ name: string; texture: string }>;

class TreeKindFactory {
  private readonly kinds = new Map<string, TreeKind>();

  get(name: string, texture: string): TreeKind {
    const key = JSON.stringify([name, texture]);
    const existing = this.kinds.get(key);
    if (existing) {
      return existing;
    }

    const kind = Object.freeze({ name, texture });
    this.kinds.set(key, kind);
    return kind;
  }
}

class Tree {
  constructor(
    readonly x: number,
    readonly y: number,
    readonly kind: TreeKind,
  ) {}

  draw(): string {
    return `${this.kind.name} (${this.kind.texture}) в точке ${this.x}, ${this.y}`;
  }
}

const kinds = new TreeKindFactory();
const first = new Tree(10, 20, kinds.get("Сосна", "pine.png"));
const second = new Tree(30, 40, kinds.get("Сосна", "pine.png"));
console.log(first.kind === second.kind); // true
console.log(first.draw(), second.draw()); // Одна текстура, две позиции
