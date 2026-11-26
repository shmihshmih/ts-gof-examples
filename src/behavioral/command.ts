/**
 * Команда. Изменение документа представлено объектом, который
 * история может выполнить. Каждый вызов возвращает свою операцию отмены.
 */
type Undo = () => void;

interface Command {
  execute(): Undo;
}

class TextDocument {
  text = "";
}

class AppendText implements Command {
  constructor(
    private readonly document: TextDocument,
    private readonly suffix: string,
  ) {}

  execute(): Undo {
    const previousText = this.document.text;
    this.document.text += this.suffix;
    return () => {
      this.document.text = previousText;
    };
  }
}

class CommandHistory {
  private readonly undoStack: Undo[] = [];

  run(command: Command): void {
    this.undoStack.push(command.execute());
  }

  undo(): void {
    this.undoStack.pop()?.();
  }
}

const document = new TextDocument();
const history = new CommandHistory();
history.run(new AppendText(document, "Привет"));
history.run(new AppendText(document, ", мир!"));
console.log(document.text); // Привет, мир!
history.undo();
console.log(document.text); // Привет
