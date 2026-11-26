/**
 * Компоновщик. Товар и коробка поддерживают один интерфейс.
 * Коробка суммирует цены дочерних элементов, в том числе других коробок.
 */
interface PricedItem {
  total(): number;
}

class Product implements PricedItem {
  constructor(private readonly price: number) {}

  total(): number {
    return this.price;
  }
}

class Box implements PricedItem {
  constructor(private readonly items: readonly PricedItem[]) {}

  total(): number {
    return this.items.reduce((sum, item) => sum + item.total(), 0);
  }
}

const order = new Box([new Product(200), new Box([new Product(300), new Product(500)])]);
console.log(order.total()); // 1000
