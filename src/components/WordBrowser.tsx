import { useEffect, useState } from 'react';
import { fetchAllWords } from '../services/wordService';
import { Link } from 'react-router-dom';
import type { Word } from '../types/word';

export default function WordBrowser() {
  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('word');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchAllWords(page, 50, sort, order, query).then(data => {
      setWords(data.results);
      setTotalPages(data.totalPages);
    });
  }, [page, sort, order, query]);

   return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Browse All Words</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 p-2 rounded w-full sm:w-1/2"
        />
        <select
          onChange={e => setSort(e.target.value)}
          value={sort}
          className="border p-2 rounded"
        >
          <option value="word">Word</option>
          <option value="ipa">IPA</option>
          <option value="language">Language</option>
        </select>
        <select
          onChange={e => setOrder(e.target.value as 'asc' | 'desc')}
          value={order}
          className="border p-2 rounded"
        >
          <option value="asc">A–Z</option>
          <option value="desc">Z–A</option>
        </select>
      </div>

      <ul className="space-y-2">
        {words.map(word => (
          <li key={word.id}>
            <Link to={`/words/${word.id}`} className="text-blue-600 hover:underline">
              {word.word}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>
        <span>Page {page} / {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
