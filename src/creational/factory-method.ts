/**
 * Фабричный метод. Экспортёр знает порядок действий,
 * а подкласс решает, какой форматтер создать.
 */
interface Formatter {
  format(rows: string[][]): string;
}

class CsvFormatter implements Formatter {
  format(rows: string[][]): string {
    // Кавычки внутри поля удваиваются по правилам CSV.
    return rows.map(row => row.map(cell => '"' + cell.replaceAll('"', '""') + '"').join(",")).join("\n");
  }
}

class JsonFormatter implements Formatter {
  format(rows: string[][]): string {
    return JSON.stringify(rows);
  }
}

abstract class Exporter {
  // Остальная часть экспортёра зависит только от интерфейса Formatter.
  protected abstract createFormatter(): Formatter;

  export(rows: string[][]): string {
    return this.createFormatter().format(rows);
  }
}

class CsvExporter extends Exporter {
  protected createFormatter(): Formatter {
    return new CsvFormatter();
  }
}

class JsonExporter extends Exporter {
  protected createFormatter(): Formatter {
    return new JsonFormatter();
  }
}

const rows = [["name", "age"], ["Ada", "36"]];
console.log(new CsvExporter().export(rows)); // Две строки CSV
console.log(new JsonExporter().export(rows)); // [["name","age"],["Ada","36"]]
