/**
 * Снимок. Редактор создаёт и читает снимки своего состояния.
 * История только хранит снимки и возвращает их редактору.
 */
const savedText = Symbol("savedText");
type Snapshot = Readonly<{ [savedText]: string }>;

class Editor {
  private text = "";

  write(text: string): void {
    this.text += text;
  }

  read(): string {
    return this.text;
  }

  save(): Snapshot {
    return Object.freeze({ [savedText]: this.text });
  }

  restore(snapshot: Snapshot): void {
    this.text = snapshot[savedText];
  }
}

class EditorHistory {
  private readonly snapshots: Snapshot[] = [];

  constructor(private readonly editor: Editor) {}

  checkpoint(): void {
    this.snapshots.push(this.editor.save());
  }

  undo(): void {
    const previous = this.snapshots.pop();
    if (previous) {
      this.editor.restore(previous);
    }
  }
}

const editor = new Editor();
const history = new EditorHistory(editor);
editor.write("Черновик");
history.checkpoint();
editor.write(" с правками");
console.log(editor.read()); // Черновик с правками
history.undo();
console.log(editor.read()); // Черновик
