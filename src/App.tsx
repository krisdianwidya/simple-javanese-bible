import { useState, useEffect } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { VerseDisplay } from './components/VerseDisplay';
import { BibleVerse, SearchResult } from './types/bible';
import { fetchAndParseBible } from './utils/xmlParser';
import { searchBibleVerses } from './utils/searchParser';

function App() {
  const [verses, setVerses] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBibleData();
  }, []);

  const loadBibleData = async () => {
    try {
      setLoading(true);
      const data = await fetchAndParseBible();
      setVerses(data);
    } catch (err) {
      setError('Gagal loading data Alkitab. Coba maneh.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearching(true);
    setError(null);

    try {
      const result = searchBibleVerses(verses, query);
      if (result) {
        setSearchResult(result);
      } else {
        setError('Ora ketemu. Coba tulis kaya: Lukas 18:9-14');
        setSearchResult(null);
      }
    } catch (err) {
      setError('Ana sing salah nalika nggoleki.');
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-12 h-12 text-amber-700" />
            <h1 className="text-4xl font-bold text-amber-900">
              Alkitab Jawa
            </h1>
          </div>

          {loading ? (
            <div className="flex items-center gap-3 text-amber-700">
              <Loader2 className="w-6 h-6 animate-spin" />
              <p className="text-lg">Loading data Alkitab...</p>
            </div>
          ) : (
            <>
              <SearchBar onSearch={handleSearch} isLoading={searching} />

              {error && (
                <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 max-w-2xl w-full">
                  {error}
                </div>
              )}

              {searching && (
                <div className="mt-6 flex items-center gap-3 text-amber-700">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <p>Nggoleki...</p>
                </div>
              )}

              {searchResult && !searching && (
                <VerseDisplay result={searchResult} />
              )}

              {!searchResult && !error && !searching && (
                <div className="mt-12 text-center text-amber-800">
                  <p className="text-lg mb-2">Goleken ayat Alkitab</p>
                  <p className="text-sm text-amber-600">
                    Tulis jeneng buku, bab, lan ayat. Contoné: Lukas 18:9-14
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
