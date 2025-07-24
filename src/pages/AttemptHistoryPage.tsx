import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Word } from '../types/word';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../layout/Footer';

interface Attempt {
  _id: string;
  userId: string;
  wordId: string;
  audioUrl: string;
  score: number;
  feedback: string;
  createdAt: string;
}

export default function AttemptHistoryPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [words, setWords] = useState<Record<string, Word>>({});
  const [loading, setLoading] = useState(true);

  const fakeUserId = 'dev-user-001';
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await api.get('/pronunciation/user/attempts', {
          params: { userId: fakeUserId },
        });
        const allAttempts: Attempt[] = res.data;

        setAttempts(allAttempts);

        const wordMap: Record<string, Word> = {};
        const uniqueWordIds = [...new Set(allAttempts.map((a) => a.wordId))];

        for (const id of uniqueWordIds) {
          try {
            const wordRes = await api.get(`/words/id/${id}`);
            wordMap[id] = wordRes.data;
          } catch {
            console.warn(`Word with ID ${id} not found`);
          }
        }

        setWords(wordMap);
      } catch (error) {
        console.error('Error fetching attempts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttempts();
  }, []);

  const handleDeleteAttempt = async (attemptId: string) => {
    if (!window.confirm(t('confirmDelete'))) return;

    try {
      await api.delete(`/pronunciation/${attemptId}`, {
        params: { userId: fakeUserId },
      });

      setAttempts((prev) => prev.filter((a) => a._id !== attemptId));
    } catch (error) {
      console.error('Failed to delete attempt:', error);
      alert(t('deleteError'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-white via-sky-50 to-cyan-100">
      <div className="max-w-6xl w-full mx-auto px-4 pt-10 pb-20">
        <div className="bg-white bg-opacity-80 shadow-xl rounded-xl p-6 sm:p-10">
          <div className="mb-4 flex justify-between items-center">
            <Link to="/" className="text-purple-600 hover:underline text-sm font-semibold">
              🏠 {t('home')}
            </Link>
            <LanguageSwitcher />
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500 mb-2">
            {t('yourAttempts')}
          </h1>
          <p className="text-gray-700 mb-6">{t('allAttemptsInfo')}</p>

          {loading ? (
            <p className="text-gray-500">{t('loading')}</p>
          ) : attempts.length === 0 ? (
            <p className="text-blue-500 font-medium">{t('noAttempts')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-200 text-sm bg-white bg-opacity-90 rounded-md">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-50 to-blue-50">
                    <th className="p-2 border">{t('action')}</th>
                    <th className="p-2 border">{t('word')}</th>
                    <th className="p-2 border">{t('score')}</th>
                    <th className="p-2 border">{t('feedback')}</th>
                    <th className="p-2 border">{t('audio')}</th>
                    <th className="p-2 border">{t('date')}</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts
                    .slice()
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((attempt) => (
                      <tr key={attempt._id}>
                        <td className="p-2 border text-center">
                          <button
                            onClick={() => handleDeleteAttempt(attempt._id)}
                            className="text-red-600 hover:text-red-700 hover:underline cursor-pointer text-sm"
                          >
                            🗑 {t('delete')}
                          </button>
                        </td>
                        <td className="p-2 border font-medium hover:underline">
                          {words[attempt.wordId]?.word ? (
                            <Link to={`/words/${attempt.wordId}`}>
                              {words[attempt.wordId].word}
                            </Link>
                          ) : (
                            t('unknown')
                          )}
                        </td>
                        <td className="p-2 border">{attempt.score ?? '–'}</td>
                        <td className="p-2 border">{attempt.feedback || t('pending')}</td>
                        <td className="p-2 border">
                          <audio controls className="w-full">
                            <source src={attempt.audioUrl} type="audio/webm" />
                            {t('noPlayback')}
                          </audio>
                        </td>
                        <td className="p-2 border text-gray-500">
                          {new Date(attempt.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
