import { useEffect, useState } from 'react';
import { fetchSampleWords } from '../services/wordService';
import type { Word } from '../types/word';

export default function WordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSampleWords()
      .then((data) => {
        setWords(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load words.');
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading words...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2>Sample Words</h2>
      <ul>
        {words.map((word) => (
          <li key={word.id}>{word.word}</li>
        ))}
      </ul>
    </div>
  );
}
