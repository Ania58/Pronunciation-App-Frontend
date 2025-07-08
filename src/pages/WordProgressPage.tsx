import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Word } from '../types/word';
import { Link } from 'react-router-dom';

/*interface StatusEntry {
  wordId: string;
  status: 'mastered' | 'practice';
}*/

export default function WordProgressPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [statuses, setStatuses] = useState<Record<string, 'mastered' | 'practice'>>({});
  const [loading, setLoading] = useState(true);

  const fakeUserId = 'dev-user-001';

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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <div className="mb-4">
            <Link
                to="/"
                className="text-blue-600 hover:underline"
            >
                🏠 Home
            </Link>
        </div>
      <h1 className="text-2xl font-bold mb-4">🧠 Your Word Progress</h1>
      <p className="text-sm text-gray-600 mb-6">All words you’ve marked as “mastered” or “practice”.</p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : words.length === 0 ? (
        <p className="text-gray-500">You haven’t marked any words yet.</p>
      ) : (
        <table className="w-full table-auto border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Word</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {words.map((w) => (
              <tr key={w.id}>
                <td className="p-2 border font-medium">{w.word}</td>
                <td className="p-2 border capitalize">{statuses[w.id]}</td>
                <td className="p-2 border">
                  <Link to={`/words/${w.id}`} className="text-blue-600 hover:underline">
                    View →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
