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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 {t('home')}
        </Link>
      </div>
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold mb-4">{t('yourAttempts')}</h1>
      <p className="text-sm text-gray-600 mb-6">{t('allAttemptsInfo')}</p>

      {loading ? (
        <p className="text-gray-500">{t('loading')}</p>
      ) : attempts.length === 0 ? (
        <p className="text-gray-500">{t('noAttempts')}</p>
      ) : (
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">{t('word')}</th>
              <th className="p-2 border">{t('score')}</th>
              <th className="p-2 border">{t('feedback')}</th>
              <th className="p-2 border">{t('audio')}</th>
              <th className="p-2 border">{t('date')}</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt) => (
              <tr key={attempt._id}>
                <td className="p-2 border font-medium">
                  {words[attempt.wordId]?.word || t('unknown')}
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
      )}
      <Footer />
    </div>
  );
}
