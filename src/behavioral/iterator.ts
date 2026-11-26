/**
 * Итератор. Плейлист хранит треки в группах, а вызывающий код
 * перебирает их одной последовательностью через обычный for...of.
 */
class Playlist implements Iterable<string> {
  constructor(private readonly groups: readonly (readonly string[])[]) {}

  // Каждый вызов создаёт независимый итератор с собственной позицией.
  *[Symbol.iterator](): IterableIterator<string> {
    for (const group of this.groups) {
      yield* group;
    }
  }
}

const playlist = new Playlist([["Intro", "Night"], [], ["Morning"]]);
const first = playlist[Symbol.iterator]();
const second = playlist[Symbol.iterator]();
console.log(first.next().value, first.next().value, second.next().value); // Intro Night Intro

for (const track of playlist) {
  console.log(track); // Intro, Night, Morning
}
