import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Word } from '../types/word';

export default function WordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/words/all')
      .then((res) => {
        setWords(res.data);
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
      <h2>All Words</h2>
      <ul>
        {words.slice(0, 200).map((word) => (
          <li key={word.id}>
            <Link to={`/words/${word.id}`}>{word.word}</Link>
          </li>
    ))}
      </ul>
    </div>
  );
}
