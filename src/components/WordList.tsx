import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Word } from '../types/word';

export default function WordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    api.get('/words/all', {
      params: {
        page,
        limit: 50,
        sort: 'word',
        order: 'asc',
        query: search,
      },
    })
      .then((res) => {
        setWords(res.data.results);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load words.');
        console.error(err);
        setLoading(false);
      });
  }, [page, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  if (loading) return <p>Loading words...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2>All Words</h2>

      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search words..."
        className="border p-2 mb-4 w-full max-w-md"
      />

      <ul>
        {words.map((word) => (
          <li key={word.id}>
            <Link to={`/words/${word.id}`}>{word.word}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded"
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

