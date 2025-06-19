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
    <div>
      <h2>Explore Words</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setPage(1); 
          }}
        />
        <select onChange={e => setSort(e.target.value)} value={sort}>
          <option value="word">Word</option>
          <option value="ipa">IPA</option>
          <option value="language">Language</option>
        </select>
        <select onChange={e => setOrder(e.target.value as 'asc' | 'desc')} value={order}>
          <option value="asc">A–Z</option>
          <option value="desc">Z–A</option>
        </select>
      </div>

      <ul>
        {words.map(word => (
          <li key={word.id}>
            <Link to={`/words/${word.id}`}>{word.word}</Link>
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} / {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
