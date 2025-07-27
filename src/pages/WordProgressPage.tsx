import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Word } from '../types/word';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useUser } from '../contexts/UserContext';

export default function WordProgressPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [statuses, setStatuses] = useState<Record<string, 'mastered' | 'practice'>>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'mastered' | 'practice'>('all');

  const { user } = useUser();
  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    if (!user?.uid) return;

    const fetchStatusesAndWords = async () => {
      try {
        const res = await api.get('/words/statuses', {
          params: { userId: user.uid },
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
  }, [user?.uid]);

  const filtered = words.filter(w =>
    filter === 'all' ? true : statuses[w.id] === filter
  );

  const handleRemoveWord = async (wordId: string, wordText: string) => {
    const confirmed = window.confirm(t('removeWordConfirm', { word: wordText }));
    if (!confirmed) return;

    try {
      await api.delete(`/words/${wordId}/status`, {
        params: { userId: user?.uid },
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

  if (!user) {
    return <p className="text-center mt-10 text-gray-500">{t('auth.loginRequired')}</p>;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-yellow-50">
        <main className="flex-grow flex justify-center">
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 m-4 border border-gray-200">
            <div className="mb-6">
              <button
                onClick={() => navigate(-1)}
                className="text-indigo-700 hover:text-indigo-500 hover:underline font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
              ← {t('goBack')}
              </button>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
              {(['all', 'mastered', 'practice'] as const).map(btn => (
                <button
                  key={btn}
                  onClick={() => setFilter(btn)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition cursor-pointer ${
                    filter === btn
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {t(`filter.${btn}`)}
                </button>
              ))}
            </div>

            <h1 className="text-3xl font-bold mb-3">🧠 {t('yourProgress')}</h1>
            <p className="text-gray-600 text-sm mb-6">{t('markedWordsDescription')}</p>

            {loading ? (
              <p className="text-gray-500">{t('loading')}</p>
            ) : words.length === 0 ? (
              <p className="text-gray-500">{t('noWordsMarked')}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border border-gray-200 text-sm text-left rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-3 border border-gray-200">{t('sort.word')}</th>
                      <th className="p-3 border border-gray-200">{t('currentStatus')}</th>
                      <th className="p-3 border border-gray-200">{t('action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((w) => (
                      <tr key={w.id} className="hover:bg-gray-50">
                        <td className="p-3 border border-gray-100 font-medium">{w.word}</td>
                        <td className="p-3 border border-gray-100 capitalize">{t(statuses[w.id])}</td>
                        <td className="p-3 border border-gray-100 space-x-3">
                          <Link
                            to={`/words/${w.id}`}
                            className="text-blue-600 hover:underline font-medium cursor-pointer"
                          >
                            {t('viewDetails')} →
                          </Link>
                          <button
                            onClick={() => handleRemoveWord(w.id, w.word)}
                            className="text-red-600 hover:underline font-medium cursor-pointer"
                          >
                            {t('delete')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

