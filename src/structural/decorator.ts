/**
 * Декоратор. Каждая добавка оборачивает напиток и сама реализует Drink.
 * Благодаря этому добавки можно вкладывать друг в друга.
 */
interface Drink {
  description(): string;
  cost(): number;
}

class Coffee implements Drink {
  description(): string {
    return "Кофе";
  }

  cost(): number {
    return 120;
  }
}

class WithMilk implements Drink {
  constructor(private readonly drink: Drink) {}

  description(): string {
    return `${this.drink.description()} + молоко`;
  }

  cost(): number {
    return this.drink.cost() + 30;
  }
}

class WithCinnamon implements Drink {
  constructor(private readonly drink: Drink) {}

  description(): string {
    return `${this.drink.description()} + корица`;
  }

  cost(): number {
    return this.drink.cost() + 10;
  }
}

const drink = new WithCinnamon(new WithMilk(new Coffee()));
console.log(drink.description(), drink.cost()); // Кофе + молоко + корица 160
