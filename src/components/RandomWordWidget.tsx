import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Word } from '../types/word';

export default function RandomWordWidget() {
  const [word, setWord] = useState<Word | null>(null);

  const fetchRandom = async () => {
    try {
      const res = await api.get('/words/random');
      setWord(res.data);
    } catch (err) {
      console.error('Failed to fetch random word', err);
    }
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  if (!word) return null;

  return (
    <div className="border p-4 rounded shadow mb-4 bg-white">
      <h3 className="text-lg font-semibold mb-2">Random Word</h3>
      <p><strong>{word.word}</strong> ({word.language})</p>
      {word.ipa && <p><em>{word.ipa}</em></p>}
      {word.category && <p>Category: {word.category}</p>}
      <Link
        to={`/words/${word.id}`}
        className="text-blue-600 underline text-sm"
      >
        View Details
      </Link>
      <button
        onClick={fetchRandom}
        className="mt-2 px-2 py-1 text-sm border rounded"
      >
        Show Another
      </button>
    </div>
  );
}
