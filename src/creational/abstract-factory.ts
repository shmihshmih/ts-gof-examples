/**
 * Абстрактная фабрика. Интерфейс получает согласованную пару кнопки
 * и поля ввода от одной фабрики темы.
 */
interface Button {
  render(): string;
}

interface TextField {
  render(): string;
}

interface ThemeFactory {
  createButton(): Button;
  createTextField(): TextField;
}

class LightTheme implements ThemeFactory {
  createButton(): Button {
    return { render: () => "Светлая кнопка" };
  }

  createTextField(): TextField {
    return { render: () => "Светлое поле" };
  }
}

class DarkTheme implements ThemeFactory {
  createButton(): Button {
    return { render: () => "Тёмная кнопка" };
  }

  createTextField(): TextField {
    return { render: () => "Тёмное поле" };
  }
}

function renderForm(theme: ThemeFactory): string {
  const button = theme.createButton();
  const field = theme.createTextField();
  return [field.render(), button.render()].join(" + ");
}

console.log(renderForm(new LightTheme())); // Светлое поле + Светлая кнопка
console.log(renderForm(new DarkTheme())); // Тёмное поле + Тёмная кнопка
