/**
 * Фасад. Одного вызова placeOrder() хватает, чтобы согласовать
 * действия склада, оплаты и формирования чека.
 */
class Stock {
  reserve(sku: string): string {
    return `Товар ${sku} зарезервирован`;
  }
}

class Billing {
  charge(amount: number): string {
    return `Оплачено ${amount} руб.`;
  }
}

class ReceiptPrinter {
  print(sku: string): string {
    return `Чек на товар ${sku}`;
  }
}

class CheckoutFacade {
  constructor(
    private readonly stock: Stock,
    private readonly billing: Billing,
    private readonly receipts: ReceiptPrinter,
  ) {}

  placeOrder(sku: string, amount: number): string {
    return [
      this.stock.reserve(sku),
      this.billing.charge(amount),
      this.receipts.print(sku),
    ].join("\n");
  }
}

const checkout = new CheckoutFacade(new Stock(), new Billing(), new ReceiptPrinter());
console.log(checkout.placeOrder("BOOK", 950)); // Резерв, оплата и чек
