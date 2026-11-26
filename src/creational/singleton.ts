/**
 * Одиночка. Класс скрывает конструктор и выдаёт один общий экземпляр
 * журнала в пределах загруженного модуля.
 */
class EventLog {
  private static instance: EventLog | undefined;
  private readonly entries: string[] = [];

  private constructor() {}

  static getInstance(): EventLog {
    EventLog.instance ??= new EventLog();
    return EventLog.instance;
  }

  add(entry: string): void {
    this.entries.push(entry);
  }

  list(): readonly string[] {
    return [...this.entries];
  }
}

const first = EventLog.getInstance();
const second = EventLog.getInstance();
first.add("Отчёт готов");

console.log(first === second); // true
console.log(second.list().join(", ")); // Отчёт готов
