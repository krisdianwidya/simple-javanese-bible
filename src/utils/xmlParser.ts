import { BibleVerse } from '../types/bible';
import { BOOK_NAMES } from '../constants/bookNames';

export async function fetchAndParseBible(): Promise<BibleVerse[]> {
  const response = await fetch(
    'https://raw.githubusercontent.com/Beblia/Holy-Bible-XML-Format/master/JavaneseBible.xml'
  );
  const xmlText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

  const verses: BibleVerse[] = [];
  const books = xmlDoc.querySelectorAll('book');

  books.forEach((book) => {
    const bookNumber = parseInt(book.getAttribute('number') || '0');
    const bookName = BOOK_NAMES[bookNumber - 1] || `Book ${bookNumber}`;

    const chapters = book.querySelectorAll('chapter');
    chapters.forEach((chapter) => {
      const chapterNumber = parseInt(chapter.getAttribute('number') || '0');

      const verseElements = chapter.querySelectorAll('verse');
      verseElements.forEach((verseElement) => {
        const verseNumber = parseInt(verseElement.getAttribute('number') || '0');
        const text = verseElement.textContent?.trim() || '';

        verses.push({
          bookNumber,
          bookName,
          chapter: chapterNumber,
          verse: verseNumber,
          text,
        });
      });
    });
  });

  return verses;
}
