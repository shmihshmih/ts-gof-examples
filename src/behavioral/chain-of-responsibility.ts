/**
 * Цепочка обязанностей. Каждый обработчик либо обслуживает заявку,
 * либо передаёт её следующему звену.
 */
type Ticket = { topic: "доставка" | "оплата" | "другое"; id: number };

abstract class TicketHandler {
  constructor(private readonly next?: TicketHandler) {}

  handle(ticket: Ticket): string {
    return this.tryHandle(ticket)
      ?? this.next?.handle(ticket)
      ?? `У заявки №${ticket.id} пока нет исполнителя`;
  }

  protected abstract tryHandle(ticket: Ticket): string | undefined;
}

class ShippingHandler extends TicketHandler {
  protected tryHandle(ticket: Ticket): string | undefined {
    if (ticket.topic === "доставка") {
      return `Логистика приняла заявку №${ticket.id}`;
    }
  }
}

class BillingHandler extends TicketHandler {
  protected tryHandle(ticket: Ticket): string | undefined {
    if (ticket.topic === "оплата") {
      return `Бухгалтерия приняла заявку №${ticket.id}`;
    }
  }
}

const support = new ShippingHandler(new BillingHandler());
console.log(support.handle({ topic: "доставка", id: 1 })); // Логистика
console.log(support.handle({ topic: "оплата", id: 2 })); // Бухгалтерия
console.log(support.handle({ topic: "другое", id: 3 })); // Исполнителя нет
