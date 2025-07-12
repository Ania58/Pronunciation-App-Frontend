import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchAllWords, fetchFilteredWords } from '../services/wordService';
import { Link } from 'react-router-dom';
import type { Word } from '../types/word';

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

  const queryParams = new URLSearchParams(location.search);

  const categoryFromUrl = queryParams.get('category') || '';
  const difficultyFromUrl = queryParams.get('difficulty') || '';

  if (category !== categoryFromUrl) setCategory(categoryFromUrl);
  if (difficulty !== difficultyFromUrl) setDifficulty(difficultyFromUrl);

  const fetchData = async () => {
  if (categoryFromUrl || difficultyFromUrl) {
    const filteredWords = await fetchFilteredWords(categoryFromUrl, difficultyFromUrl, query); 
    setWords(filteredWords);
    setTotalPages(1); 
  } else {
    const fullData = await fetchAllWords(page, 50, sort, order, query);
    setWords(fullData.results);
    setTotalPages(fullData.totalPages);
  }
};
fetchData();

}, [page, sort, order, query, location.search]);


   return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline cursor-pointer">
          ← {t('goBack')}
        </button>
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 {t('home')}
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4">{t('browseAllWords')}</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 p-2 rounded w-full sm:w-[250px] md:w-[300px] lg:w-[350px]"
        />
        <select
          value={category}
          onChange={(e) => {
          const value = e.target.value;
          const params = new URLSearchParams(location.search);
          if (value) {
            params.set('category', value);
          } else {
            params.delete('category');
          }
          navigate(`/words-browser?${params.toString()}`);
          setPage(1);
        }}

          className="border p-2 rounded"
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
          if (value) {
            params.set('difficulty', value);
          } else {
            params.delete('difficulty');
          }
          navigate(`/words-browser?${params.toString()}`);
          setPage(1);
        }}

          className="border p-2 rounded"
        >
          <option value="">{t('allDifficulties')}</option>
          <option value="easy">{t('easy')}</option>
          <option value="medium">{t('medium')}</option>
          <option value="hard">{t('hard')}</option>
        </select>
        <select
          onChange={e => setSort(e.target.value)}
          value={sort}
          className="border p-2 rounded"
        >
          <option value="word">{t('sort.word')}</option>
          <option value="ipa">{t('sort.ipa')}</option>
          <option value="language">{t('language')}</option>
        </select>
        <select
          onChange={e => setOrder(e.target.value as 'asc' | 'desc')}
          value={order}
          className="border p-2 rounded"
        >
          <option value="asc">{t('sort.asc')}</option>
          <option value="desc">{t('sort.desc')}</option>
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
           {t('previous')}
        </button>
        <span>{t('page')} {page} / {totalPages}</span>
        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
        >
            {t('next')}
        </button>
      </div>
    </div>
  );
}
