/**
 * Прототип. Новый шаблон берёт настройки у готового экземпляра.
 * Сам экземпляр определяет, какие вложенные данные надо скопировать.
 */
class ReportTemplate {
  constructor(public title: string, public readonly sections: string[]) {}

  clone(): ReportTemplate {
    return new ReportTemplate(this.title, [...this.sections]);
  }
}

const original = new ReportTemplate("Отчёт за ноябрь", ["Продажи", "Расходы"]);
const draft = original.clone();
draft.title = "Отчёт за декабрь";
draft.sections.push("Прогноз");

console.log(original.title, original.sections.join(", ")); // Отчёт за ноябрь Продажи, Расходы
console.log(draft.title, draft.sections.join(", ")); // Отчёт за декабрь Продажи, Расходы, Прогноз
