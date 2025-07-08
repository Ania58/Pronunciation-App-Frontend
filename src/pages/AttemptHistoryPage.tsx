import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import type { Word } from '../types/word';

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
          🏠 Home
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">🎧 Your Pronunciation Attempts</h1>
      <p className="text-sm text-gray-600 mb-6">All attempts you've submitted, with scores, feedback, and audio.</p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : attempts.length === 0 ? (
        <p className="text-gray-500">You haven’t made any attempts yet.</p>
      ) : (
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Word</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Feedback</th>
              <th className="p-2 border">Audio</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt) => (
              <tr key={attempt._id}>
                <td className="p-2 border font-medium">
                  {words[attempt.wordId]?.word || 'Unknown'}
                </td>
                <td className="p-2 border">{attempt.score ?? '–'}</td>
                <td className="p-2 border">{attempt.feedback || 'No feedback yet'}</td>
                <td className="p-2 border">
                  <audio controls className="w-full">
                    <source src={attempt.audioUrl} type="audio/webm" />
                    Your browser does not support audio playback.
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
    </div>
  );
}
