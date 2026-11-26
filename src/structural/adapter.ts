/**
 * Адаптер. Сервис оплаты ожидает рубли, а старый шлюз принимает копейки.
 * Адаптер реализует нужный интерфейс и переводит вызов.
 */
interface PaymentProcessor {
  pay(amountInRubles: number): string;
}

class LegacyGateway {
  chargeKopecks(amount: number): string {
    return `Списано ${amount} коп.`;
  }
}

class PaymentAdapter implements PaymentProcessor {
  constructor(private readonly gateway: LegacyGateway) {}

  pay(amountInRubles: number): string {
    return this.gateway.chargeKopecks(Math.round(amountInRubles * 100));
  }
}

function checkout(processor: PaymentProcessor): string {
  return processor.pay(129.90);
}

console.log(checkout(new PaymentAdapter(new LegacyGateway()))); // Списано 12990 коп.
