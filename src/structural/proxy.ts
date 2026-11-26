/**
 * Заместитель. Клиент обращается к Image, а прокси решает,
 * когда создавать и загружать настоящее изображение.
 */
interface Image {
  display(): string;
}

class LoadedImage implements Image {
  constructor(private readonly filename: string) {
    console.log(`Загрузка ${filename}`);
  }

  display(): string {
    return `Показ ${this.filename}`;
  }
}

class LazyImage implements Image {
  private image: Image | undefined;

  constructor(private readonly filename: string) {}

  display(): string {
    this.image ??= new LoadedImage(this.filename);
    return this.image.display();
  }
}

const image: Image = new LazyImage("cover.png");
console.log(image.display()); // Сначала загрузка, затем показ
console.log(image.display()); // Только показ
