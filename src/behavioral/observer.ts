/**
 * Наблюдатель. Датчик сообщает о новой температуре всем подписчикам.
 * Каждый подписчик сам решает, как на неё реагировать.
 */
type TemperatureListener = (temperature: number) => void;

class Thermometer {
  private readonly listeners = new Set<TemperatureListener>();

  subscribe(listener: TemperatureListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  report(temperature: number): void {
    for (const listener of [...this.listeners]) {
      listener(temperature);
    }
  }
}

const sensor = new Thermometer();
sensor.subscribe(temperature => console.log(`Экран: ${temperature} °C`));
const unsubscribe = sensor.subscribe(temperature => {
  if (temperature >= 30) {
    console.log("Включаем вентиляцию");
  }
});

sensor.report(31); // Экран и вентиляция
unsubscribe();
sensor.report(32); // Только экран
