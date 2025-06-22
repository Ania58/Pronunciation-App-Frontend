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
  <div className="border rounded-lg shadow-sm p-6 bg-white mb-6 flex justify-between items-center">
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">{word.word}</h3>
      <p className="text-gray-600 italic">{word.ipa}</p>
      <p className="text-sm text-gray-500">{word.language} • {word.category}</p>
    </div>

    <div className="flex flex-col items-end gap-2">
      <Link
        to={`/words/${word.id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        View Details
      </Link>
      <button
        onClick={fetchRandom}
        className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 cursor-pointer"
      >
        Show Another
      </button>
    </div>
  </div>
);
}
