export interface BibleVerse {
  bookNumber: number;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface SearchResult {
  verses: BibleVerse[];
  bookName: string;
  chapter: number;
  verseRange: string;
}
