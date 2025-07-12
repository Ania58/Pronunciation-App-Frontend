import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Word } from '../types/word';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/*interface StatusEntry {
  wordId: string;
  status: 'mastered' | 'practice';
}*/

export default function WordProgressPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [statuses, setStatuses] = useState<Record<string, 'mastered' | 'practice'>>({});
  const [loading, setLoading] = useState(true);

  const fakeUserId = 'dev-user-001';

  const { t } = useTranslation();

  useEffect(() => {
    const fetchStatusesAndWords = async () => {
      try {
        const res = await api.get('/words/statuses', {
            params: { userId: fakeUserId },
        });
        const allStatuses: Record<string, 'mastered' | 'practice'> = res.data;

        const wordIds = Object.keys(allStatuses);
        const wordDetails: Word[] = [];

        for (const id of wordIds) {
          try {
            const wordRes = await api.get(`/words/id/${id}`);
            wordDetails.push(wordRes.data);
          } catch {
            console.warn(`Word with ID ${id} not found`);
          }
        }

        setStatuses(allStatuses);
        setWords(wordDetails);
      } catch (error) {
        console.error('Error fetching word statuses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatusesAndWords();
  }, []);

  const handleRemoveWord = async (wordId: string, wordText: string) => {
    const confirmed = window.confirm(t('removeWordConfirm', { word: wordText }));
    if (!confirmed) return;

    try {
      await api.delete(`/words/${wordId}/status`, {
        params: { userId: fakeUserId },
      });

      setWords(prev => prev.filter(word => word.id !== wordId));
      setStatuses(prev => {
        const updated = { ...prev };
        delete updated[wordId];
        return updated;
      });
    } catch (err) {
      console.error('Failed to delete word status', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <div className="mb-4">
            <Link
                to="/"
                className="text-blue-600 hover:underline"
            >
                🏠 {t('home')}
            </Link>
        </div>
      <h1 className="text-2xl font-bold mb-4">🧠 {t('yourProgress')}</h1>
      <p className="text-sm text-gray-600 mb-6">{t('markedWordsDescription')}</p>

      {loading ? (
        <p className="text-gray-500">{t('loading')}</p>
      ) : words.length === 0 ? (
        <p className="text-gray-500">{t('noWordsMarked')}</p>
      ) : (
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">{t('sort.word')}</th>
              <th className="p-2 border">{t('currentStatus')}</th>
              <th className="p-2 border">{t('action')}</th>
            </tr>
          </thead>
          <tbody>
            {words.map((w) => (
              <tr key={w.id}>
                <td className="p-2 border font-medium">{w.word}</td>
                <td className="p-2 border capitalize">{statuses[w.id]}</td>
                <td className="p-2 border space-x-2">
                    <Link to={`/words/${w.id}`} className="text-blue-600 hover:underline">
                        {t('viewDetails')} →
                    </Link>
                    <button
                        onClick={() => handleRemoveWord(w.id, w.word)}
                        className="text-red-600 hover:underline cursor-pointer"
                    >
                        {t('delete')}
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
