/**
 * Стратегия. Корзина делегирует расчёт доставки функции.
 * Клиент выбирает алгоритм, передавая нужную функцию.
 */
type ShippingStrategy = (subtotal: number) => number;

const pickup: ShippingStrategy = () => 0;
const courier: ShippingStrategy = subtotal => subtotal >= 3000 ? 0 : 350;

class Basket {
  constructor(private readonly subtotal: number) {}

  total(shipping: ShippingStrategy): number {
    return this.subtotal + shipping(this.subtotal);
  }
}

const basket = new Basket(1800);
console.log(basket.total(pickup)); // 1800
console.log(basket.total(courier)); // 2150
console.log(new Basket(3200).total(courier)); // 3200
