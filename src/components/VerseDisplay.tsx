import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { SearchResult } from '../types/bible';

interface VerseDisplayProps {
  result: SearchResult;
}

export function VerseDisplay({ result }: VerseDisplayProps) {
  const [copied, setCopied] = useState(false);

  const formatVerseText = () => {
    return result.verses
      .map((verse) => `${verse.verse} ${verse.text}`)
      .join('\n');
  };

  const formatCopyText = () => {
    return result.verses
      .map((verse) => `${verse.verse}. ${verse.text}`)
      .join('\n\n');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatCopyText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-amber-900">
            {result.bookName} {result.chapter}:{result.verseRange}
          </h2>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Wis Kesalin</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {result.verses.map((verse, index) => (
          <div key={index} className="flex gap-3">
            <span className="font-bold text-amber-700 min-w-[2rem]">
              {verse.verse}
            </span>
            <p className="text-gray-800 leading-relaxed">{verse.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
