/**
 * Мост. Виды уведомлений и каналы доставки образуют две независимые
 * линии расширения. Любое уведомление получает канал через конструктор.
 */
interface DeliveryChannel {
  send(message: string): string;
}

class EmailChannel implements DeliveryChannel {
  send(message: string): string {
    return `Email: ${message}`;
  }
}

class SmsChannel implements DeliveryChannel {
  send(message: string): string {
    return `SMS: ${message}`;
  }
}

abstract class Notification {
  constructor(protected readonly channel: DeliveryChannel) {}

  abstract send(text: string): string;
}

class Alert extends Notification {
  send(text: string): string {
    return this.channel.send(`Срочно: ${text}`);
  }
}

class Reminder extends Notification {
  send(text: string): string {
    return this.channel.send(`Напоминание: ${text}`);
  }
}

console.log(new Alert(new EmailChannel()).send("Сервер недоступен"));
console.log(new Alert(new SmsChannel()).send("Сервер недоступен"));
console.log(new Reminder(new EmailChannel()).send("Встреча в 10:00"));
