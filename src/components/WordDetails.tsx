import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Word } from '../types/word';
import RecorderWidget from '../features/record/RecorderWidget';



export default function WordDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [audioExists, setAudioExists] = useState(false);

  const updateStatus = async (newStatus: 'mastered' | 'practice') => {
  try {
    if (!word || !word.id) return;
    await api.post(`/words/${word.id}/status`, { status: newStatus });
    setWord((prevWord) => {
      if (!prevWord) return prevWord;
      return { ...prevWord, status: newStatus };
    });

  } catch (err) {
    console.error('Failed to update word status:', err);
  }
};


  useEffect(() => {
    console.log("Fetching word with id:", id);
    api.get(`/words/id/${id}`)
      .then(res => {
        console.log("Response data:", res.data);
        const data: Word = res.data;
        setWord(data);
        setLoading(false);

        const audioUrl = `https://api.dictionaryapi.dev/media/pronunciations/en/${data.word}-us.mp3`;
        fetch(audioUrl, { method: 'HEAD' }).then((res) => {
          if (res.ok) setAudioExists(true);
        });
      })
      .catch(() => {
        console.error("Error fetching word:", error);
        setError('Word not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!word) return null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline cursor-pointer">
          ← Go Back
        </button>
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 Home
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4">{word.word}</h2>
      <p className="mb-2"><strong>IPA:</strong> {word.ipa}</p>
      <p className="mb-2"><strong>Language:</strong> {word.language}</p>
      {word.category && <p className="mb-2"><strong>Category:</strong> {word.category}</p>}
      {word.difficulty && <p className="mb-2"><strong>Difficulty:</strong> {word.difficulty}</p>}

      {audioExists && (
        <audio className="my-4 w-full" controls src={`https://api.dictionaryapi.dev/media/pronunciations/en/${word.word}-us.mp3`} />
      )}

      <div className="mt-6 p-4 bg-gray-100 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">🎤 Practice Your Pronunciation</h3>
        <p className="mb-4 text-sm text-gray-700">Record yourself and compare with the native pronunciation above.</p>
        <RecorderWidget />
      </div>


      {word.status && (
        <p className="text-sm text-gray-700 mb-2">
          Current status: <strong>{word.status}</strong>
        </p>
      )}

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => updateStatus('mastered')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
        >
          ✅ Mastered
        </button>
        <button
          onClick={() => updateStatus('practice')}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 cursor-pointer"
        >
          🕒 Practice
        </button>
      </div>
    </div>
  );
}