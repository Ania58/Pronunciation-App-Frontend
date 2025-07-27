import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchAllWords } from '../services/wordService';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import type { Word } from '../types/word';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

export default function WordBrowser() {
  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('word');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('category') || '';
    const difficultyFromUrl = queryParams.get('difficulty') || '';
    const pageFromUrl = parseInt(queryParams.get('page') || '1');

    if (category !== categoryFromUrl) setCategory(categoryFromUrl);
    if (difficulty !== difficultyFromUrl) setDifficulty(difficultyFromUrl);
    if (page !== pageFromUrl) setPage(pageFromUrl);

    const fetchData = async () => {
      const limit = 50;

      if (categoryFromUrl || difficultyFromUrl) {
        const res = await api.get('/words', {
          params: {
            category: categoryFromUrl,
            difficulty: difficultyFromUrl,
            query,
            page: pageFromUrl,
            limit,
          },
        });

        setWords(res.data.results);
        setTotalPages(res.data.totalPages);
      } else {
        const fullData = await fetchAllWords(
          pageFromUrl,
          limit,
          sort,
          order,
          query
        );
        setWords(fullData.results);
        setTotalPages(fullData.totalPages);
      }
    };

    fetchData();
  }, [page, sort, order, query, location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [page]);

  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-cyan-100 via-lime-100 to-indigo-100 px-4 py-10 sm:px-6 md:px-10 flex flex-col items-center transition-all duration-700 ease-in-out animate-fade-in">
        <div className="w-full max-w-7xl bg-white/60 rounded-3xl shadow-xl p-6 sm:p-10 backdrop-blur-md animate-slide-in-up duration-700 ease-out">

          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-700 hover:text-indigo-500 hover:underline font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              ← {t('goBack')}
            </button>
          </div>

          <h2 className="text-4xl font-extrabold mb-8 tracking-wide text-center text-indigo-800 animate-fade-in delay-100">
            {category || difficulty ? t('filteredWords') : t('browseAllWords')}
          </h2>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-6 justify-center">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="border border-gray-300 p-2 rounded-lg shadow-sm w-full sm:w-[250px] md:w-[300px] lg:w-[350px] transition-all focus:ring-2 focus:ring-lime-300"
            />

            <select
              value={category}
              onChange={(e) => {
                const value = e.target.value;
                const params = new URLSearchParams(location.search);
                value ? params.set('category', value) : params.delete('category');
                params.set('page', '1');
                navigate(`/words-browser?${params.toString()}`);
              }}
              className="border p-2 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <option value="">{t('allCategories')}</option>
              <option value="vowels">{t('vowels')}</option>
              <option value="consonant clusters">{t('consonantClusters')}</option>
              <option value="voiced th">{t('voicedTH')}</option>
              <option value="voiceless th">{t('voicelessTH')}</option>
              <option value="diphthongs">{t('diphthongs')}</option>
              <option value="schwa">{t('schwa')}</option>
              <option value="stress">{t('stress')}</option>
              <option value="other">{t('other')}</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => {
                const value = e.target.value;
                const params = new URLSearchParams(location.search);
                value ? params.set('difficulty', value) : params.delete('difficulty');
                params.set('page', '1');
                navigate(`/words-browser?${params.toString()}`);
              }}
              className="border p-2 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <option value="">{t('allDifficulties')}</option>
              <option value="easy">{t('easy')}</option>
              <option value="medium">{t('medium')}</option>
              <option value="hard">{t('hard')}</option>
            </select>

            <select
              onChange={e => setSort(e.target.value)}
              value={sort}
              className="border p-2 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <option value="word">{t('sort.word')}</option>
              <option value="ipa">{t('sort.ipa')}</option>
              <option value="language">{t('language')}</option>
            </select>

            <select
              onChange={e => setOrder(e.target.value as 'asc' | 'desc')}
              value={order}
              className="border p-2 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-all"
            >
              <option value="asc">{t('sort.asc')}</option>
              <option value="desc">{t('sort.desc')}</option>
            </select>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
            {words.map(word => (
              <li key={word.id}>
                <Link
                  to={`/words/${word.id}`}
                  className="block w-full text-center py-2 rounded-md bg-gradient-to-br from-violet-100 via-cyan-100 to-white text-indigo-700 hover:scale-105 hover:shadow-md hover:text-indigo-900 transition-all duration-200 font-medium cursor-pointer"
                >
                  {word.word}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mt-10 justify-center animate-fade-in delay-200">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg shadow transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('previous')}
            </button>

            <span className="text-indigo-800 font-medium">
              {t('page')} {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg shadow transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('next')}
            </button>
          </div>
        </div>

        <div className="w-full mt-24 pt-16 pb-12 bg-gradient-to-b from-transparent via-lime-100/70 to-cyan-100/60 animate-fade-in delay-1000">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2 text-sm text-indigo-800 transition-all">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

