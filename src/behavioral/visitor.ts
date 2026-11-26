/**
 * Посетитель. Фигуры направляют вызов в нужный метод посетителя.
 * Новый посетитель добавляет операцию к существующим видам фигур.
 */
interface Shape {
  accept<T>(visitor: ShapeVisitor<T>): T;
}

interface ShapeVisitor<T> {
  visitCircle(circle: Circle): T;
  visitRectangle(rectangle: Rectangle): T;
}

class Circle implements Shape {
  constructor(readonly radius: number) {}

  accept<T>(visitor: ShapeVisitor<T>): T {
    return visitor.visitCircle(this);
  }
}

class Rectangle implements Shape {
  constructor(readonly width: number, readonly height: number) {}

  accept<T>(visitor: ShapeVisitor<T>): T {
    return visitor.visitRectangle(this);
  }
}

class AreaVisitor implements ShapeVisitor<number> {
  visitCircle(circle: Circle): number {
    return Math.PI * circle.radius ** 2;
  }

  visitRectangle(rectangle: Rectangle): number {
    return rectangle.width * rectangle.height;
  }
}

class DescriptionVisitor implements ShapeVisitor<string> {
  visitCircle(circle: Circle): string {
    return `Круг радиуса ${circle.radius}`;
  }

  visitRectangle(rectangle: Rectangle): string {
    return `Прямоугольник ${rectangle.width} × ${rectangle.height}`;
  }
}

const shapes: Shape[] = [new Circle(2), new Rectangle(3, 5)];
const area = new AreaVisitor();
const description = new DescriptionVisitor();
for (const shape of shapes) {
  console.log(shape.accept(description), shape.accept(area).toFixed(2));
}
// Круг радиуса 2 12.57
// Прямоугольник 3 × 5 15.00
