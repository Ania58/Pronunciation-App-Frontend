import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import type { Word } from '../types/word';
import Header from '../layout/Header';
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
  const category = params.get('category') || '';
  const difficulty = params.get('difficulty') || '';

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
            },
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
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-violet-200 to-lime-200 flex flex-col justify-between">
        <div className="max-w-5xl w-full mx-auto px-6 py-10 animate-fade-in text-lime-100">
           <button
              onClick={() => navigate(-1)}
              className="text-indigo-700 hover:text-indigo-500 hover:underline font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              ← {t('goBack')}
            </button>

          <h2 className="text-4xl font-bold mb-6 tracking-wide text-violet-800 animate-slide-in-up">
            {category || difficulty ? t('filteredWords') : t('allWords')}
          </h2>

        <div className="mb-6 flex flex-col items-start gap-4">
          <Link
            to="/words-browser"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-lime-600 text-white rounded-full shadow-lg hover:scale-105 transform transition duration-300"
          >
            <span role="img" aria-label="pointing hand">👉</span>
            <span className="font-semibold">{t('tryWordBrowser')}</span>
          </Link>

          <input
            type="text"
            defaultValue={search}
            onChange={handleSearchChange}
            placeholder={t('searchWordsPlaceholder')}
            className="w-full max-w-md bg-indigo-800 placeholder-lime-300 text-lime-100 p-3 rounded-lg shadow-md focus:ring-2 focus:ring-cyan-400 outline-none transition-all duration-300"
          />
        </div>

          {loading ? (
            <p className="text-cyan-200 animate-pulse">{t('loadingWords')}</p>
          ) : error ? (
            <p className="text-red-400">{error}</p>
          ) : (
            <>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {words.map((word) => (
                  <li key={word.id}>
                    <Link
                      to={`/words/${word.id}`}
                      className="block bg-violet-300 hover:bg-lime-400 hover:text-black text-black rounded-lg py-2 px-4 shadow-md transition duration-300"
                    >
                      {word.word}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center items-center gap-6 mt-10">
                <button
                  onClick={() => {
                    const newPage = Math.max(1, page - 1);
                    setPage(newPage);
                    updateUrlWithPage(newPage);
                  }}
                  disabled={page === 1}
                  className="px-5 py-2 bg-violet-400 hover:bg-lime-400 text-black rounded-full shadow disabled:opacity-50 transition duration-300 cursor-pointer"
                >
                  {t('previous')}
                </button>

                <span className="text-violet-800 font-medium">
                  {t('page')} {page} {t('of')} {totalPages}
                </span>

                <button
                  onClick={() => {
                    const newPage = Math.min(totalPages, page + 1);
                    setPage(newPage);
                    updateUrlWithPage(newPage);
                  }}
                  disabled={page === totalPages}
                  className="px-5 py-2 bg-violet-400 hover:bg-lime-400 text-black rounded-full shadow disabled:opacity-50 transition duration-300 cursor-pointer"
                >
                  {t('next')}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="animate-fade-in-slow">
          <Footer />
        </div>
      </div>
    </>
  );
}
