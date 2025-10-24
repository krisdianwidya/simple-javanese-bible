import { BibleVerse, SearchResult } from '../types/bible';

export function parseSearchQuery(query: string): {
  bookName: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
} | null {
  const regex = /(.+?)\s+(\d+)\s*:\s*(\d+)(?:\s*[-–—]\s*(\d+))?/;
  const match = query.trim().match(regex);

  if (!match) return null;

  const bookName = match[1].trim();
  const chapter = parseInt(match[2]);
  const verseStart = parseInt(match[3]);
  const verseEnd = match[4] ? parseInt(match[4]) : verseStart;

  return { bookName, chapter, verseStart, verseEnd };
}

export function searchBibleVerses(
  verses: BibleVerse[],
  query: string
): SearchResult | null {
  const parsed = parseSearchQuery(query);
  if (!parsed) return null;

  const { bookName, chapter, verseStart, verseEnd } = parsed;

  const results = verses.filter(
    (verse) =>
      verse.bookName.toLowerCase() === bookName.toLowerCase() &&
      verse.chapter === chapter &&
      verse.verse >= verseStart &&
      verse.verse <= verseEnd
  );

  if (results.length === 0) return null;

  return {
    verses: results,
    bookName: results[0].bookName,
    chapter,
    verseRange: verseStart === verseEnd ? `${verseStart}` : `${verseStart}-${verseEnd}`,
  };
}
