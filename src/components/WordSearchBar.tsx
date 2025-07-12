import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import type { Word } from '../types/word';

export default function WordSearchBar() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = search.trim().toLowerCase();
    if (!trimmed) return;

    try {
      const res = await api.get('/words/all', {
        params: {
          query: trimmed,
          limit: 1,
        },
      });

      const found: Word[] = res.data.results;
      if (found.length > 0) {
        navigate(`/words/${found[0].id}`);
      } else {
        setError(t('wordNotFound'));
      }
    } catch (err) {
      console.error(err);
      setError(t('errorSearching'));
    }

    setSearch('');
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex gap-2">
      <input
        type="text"
        value={search}
        placeholder={t('searchPlaceholder')}
        onChange={(e) => {
          setSearch(e.target.value);
          setError('');
        }}
        className="border p-2 rounded w-full max-w-xs"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
        {t('search')}
      </button>
      {error && <p className="text-red-600 ml-2">{error}</p>}
    </form>
  );
}
