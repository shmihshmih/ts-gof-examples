/**
 * Шаблонный метод. Базовый класс задаёт порядок создания отчёта.
 * Подклассы реализуют отдельные шаги этого алгоритма.
 */
type Sale = { item: string; count: number };

abstract class SalesReport {
  generate(sales: readonly Sale[]): string {
    const total = sales.reduce((sum, sale) => sum + sale.count, 0);
    const lines = sales.map(sale => this.formatLine(sale));
    return [this.title(), ...lines, `Итого: ${total}`].join("\n");
  }

  protected abstract title(): string;
  protected abstract formatLine(sale: Sale): string;
}

class PlainTextReport extends SalesReport {
  protected title(): string {
    return "Продажи";
  }

  protected formatLine(sale: Sale): string {
    return `${sale.item}: ${sale.count}`;
  }
}

class MarkdownReport extends SalesReport {
  protected title(): string {
    return "## Продажи";
  }

  protected formatLine(sale: Sale): string {
    return `- **${sale.item}**: ${sale.count}`;
  }
}

const sales: Sale[] = [{ item: "Книги", count: 2 }, { item: "Блокноты", count: 3 }];
console.log(new PlainTextReport().generate(sales)); // Текст, итог 5
console.log(new MarkdownReport().generate(sales)); // Markdown, итог 5
