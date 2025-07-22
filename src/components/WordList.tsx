import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import type { Word } from '../types/word';
import LanguageSwitcher from './LanguageSwitcher';
import Footer from '../layout/Footer';

export default function WordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const location = useLocation();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const initialPage = parseInt(params.get('page') || '1');
  const [page, setPage] = useState(initialPage);

  
  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const category = params.get('category') || '';
      const difficulty = params.get('difficulty') || '';

    setLoading(true);

    const fetchData = async () => {
    try {
      if (category || difficulty) {
        const res = await api.get('/words', { 
          params: { 
            category, 
            difficulty, 
            limit: 50,
            sort: 'word',
            order: 'asc',
            query: search, 
            page,
          } 
        });
        setWords(res.data.results);
        setTotalPages(res.data.totalPages);
      } else {
        const res = await api.get('/words/all', {
          params: {
            page,
            limit: 50,
            sort: 'word',
            order: 'asc',
            query: search,
          },
      });
        setWords(res.data.results);
        setTotalPages(res.data.totalPages);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load words.');
      console.error(err);
      setLoading(false);
    }
  };

  fetchData();
}, [page, search, location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    searchTimeoutRef.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 300);
  };

  function updateUrlWithPage(newPage: number) {
  const params = new URLSearchParams(location.search);
  params.set('page', newPage.toString());
  navigate({ search: params.toString() }, { replace: true });
}

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline mb-4 block">
          🏠 {t('home')}
      </Link>
      <LanguageSwitcher />
      <h2 className="text-2xl font-bold mb-4">{t('allWords')}</h2>
      <Link to="/words-browser"
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md shadow-sm hover:bg-blue-200 transition-colors duration-200 mb-4"
      >
        <span role="img" aria-label="pointing hand">👉</span>
        <span className="font-medium">{t('tryWordBrowser')}</span>
      </Link>

      <input
        type="text"
        defaultValue={search}
        onChange={handleSearchChange}
        placeholder={t('searchWordsPlaceholder')}
        className="border border-gray-300 p-2 rounded w-full max-w-md mb-4"
      />

      {loading ? (
        <p>{t('loadingWords')}</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          <ul className="space-y-2">
            {words.map(word => (
              <li key={word.id}>
                <Link
                  to={`/words/${word.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {word.word}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => {
                const newPage = Math.max(1, page - 1);
                setPage(newPage);
                updateUrlWithPage(newPage);
              }}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            >
              {t('previous')}
            </button>

            <span>
              {t('page')} {page} {t('of')} {totalPages}
            </span>

            <button
              onClick={() => {
                const newPage = Math.min(totalPages, page + 1);
                setPage(newPage);
                updateUrlWithPage(newPage);
              }}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
            >
              {t('next')}
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
