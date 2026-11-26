/**
 * Строитель. Сценарий задаёт шаги сборки отчёта.
 * От выбранного строителя зависит представление результата.
 */
interface ReportBuilder<Result> {
  setTitle(title: string): void;
  addLine(line: string): void;
  build(): Result;
}

class TextReportBuilder implements ReportBuilder<string> {
  private title = "";
  private readonly lines: string[] = [];

  setTitle(title: string): void {
    this.title = title;
  }

  addLine(line: string): void {
    this.lines.push(line);
  }

  build(): string {
    return [this.title, ...this.lines].join("\n");
  }
}

type ReportData = Readonly<{ title: string; lines: readonly string[] }>;

class DataReportBuilder implements ReportBuilder<ReportData> {
  private title = "";
  private readonly lines: string[] = [];

  setTitle(title: string): void {
    this.title = title;
  }

  addLine(line: string): void {
    this.lines.push(line);
  }

  build(): ReportData {
    return { title: this.title, lines: [...this.lines] };
  }
}

// Сценарий сборки одинаков для обоих представлений.
function buildWeeklyReport<Result>(builder: ReportBuilder<Result>): Result {
  builder.setTitle("Итоги недели");
  builder.addLine("Продано 5 книг");
  builder.addLine("Продано 3 блокнота");
  return builder.build();
}

console.log(buildWeeklyReport(new TextReportBuilder())); // Заголовок и две строки
console.log(JSON.stringify(buildWeeklyReport(new DataReportBuilder()))); // Объект отчёта в JSON
