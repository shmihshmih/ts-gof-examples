/**
 * Состояние. Одна кнопка двигает задачу по этапам публикации.
 * Реакцию на нажатие и следующий этап определяет текущий объект состояния.
 */
interface PublicationState {
  readonly label: string;
  advance(): PublicationState;
}

class Draft implements PublicationState {
  readonly label = "Черновик";

  advance(): PublicationState {
    return new InReview();
  }
}

class InReview implements PublicationState {
  readonly label = "На проверке";

  advance(): PublicationState {
    return new Published();
  }
}

class Published implements PublicationState {
  readonly label = "Опубликовано";

  advance(): PublicationState {
    return this;
  }
}

class Publication {
  private state: PublicationState = new Draft();

  status(): string {
    return this.state.label;
  }

  advance(): string {
    this.state = this.state.advance();
    return this.status();
  }
}

const article = new Publication();
console.log(article.status()); // Черновик
console.log(article.advance()); // На проверке
console.log(article.advance()); // Опубликовано
console.log(article.advance()); // Опубликовано
