import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Word } from '../types/word';
import { useRecorder } from '../hooks/useRecorder';

interface Attempt {
  _id: string;
  userId: string;
  wordId: string;
  audioUrl: string;
  score?: number;
  feedback?: string;
  createdAt?: string; 
}

export default function WordDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [audioExists, setAudioExists] = useState(false);

  const [attempts, setAttempts] = useState<Attempt[]>([]);
  
  const {isRecording, audioUrl: recordedUrl, audioBlob, startRecording, stopRecording } = useRecorder();

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const fakeUserId = 'dev-user-001';

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

  const fetchAttempts = async () => {
    try {
      const res = await api.get(`/pronunciation/${id}/attempts`, {
        params: { userId: fakeUserId },
      });
      setAttempts(res.data);
    } catch (error) {
      console.error('Error fetching attempts:', error);
    }
  };

  const submitAttempt = async () => {
  try {
    if (!audioBlob || !id) return;

    setSubmitStatus('submitting');

    const tempUrl = URL.createObjectURL(audioBlob);

    await api.post(`/pronunciation/${id}`, {
      userId: fakeUserId,
      wordId: id,
      audioUrl: tempUrl,
    });

    setSubmitStatus('success');
    fetchAttempts();
  } catch (error) {
    console.error('Error submitting attempt:', error);
    setSubmitStatus('error');
  } finally {
    setTimeout(() => setSubmitStatus('idle'), 3000); 
  }
};

const handleDeleteAttempt = async (attemptId: string) => {
  if (!window.confirm('Are you sure you want to delete this attempt?')) return;

  try {
    await api.delete(`/pronunciation/${attemptId}`, {
      params: { userId: fakeUserId },
    });
    setAttempts((prev) => prev.filter((a) => a._id !== attemptId));
  } catch (error) {
    console.error('Failed to delete attempt:', error);
    alert('An error occurred while deleting the attempt.');
  }
};



  useEffect(() => {
    console.log("Fetching word with id:", id);
    if (!id) return;
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
      fetchAttempts();
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
  
      </div>


      {word.status && (
        <p className="text-sm text-gray-700 mb-2">
          Current status: <strong>{word.status}</strong>
        </p>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold mb-2">Submit Your Recording</h3>
        {recordedUrl && (
        <div className="mt-4">
          <p className="text-sm mb-1">Preview:</p>
          <audio controls src={recordedUrl} className="w-full" />
        </div>
      )}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex-1 px-6 py-3 rounded font-semibold shadow cursor-pointer ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRecording ? '⏹ Stop Recording' : '🎙 Start Recording'}
          </button>

          <button
            onClick={submitAttempt}
            disabled={!audioBlob}
            className="flex-1 px-6 py-3 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Submit Attempt
          </button>
          {submitStatus === 'submitting' && (
            <p className="text-blue-600 text-sm mt-2">Uploading your recording...</p>
          )}
          {submitStatus === 'success' && (
            <p className="text-green-600 text-sm mt-2">✅ Attempt submitted!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-sm mt-2">❌ Something went wrong. Please try again.</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">🗂 Your Attempts</h3>
        {attempts.length === 0 ? (
          <p className="text-sm text-gray-500">No attempts yet.</p>
        ) : (
          <ul className="space-y-2">
            {attempts
            .slice() 
            .sort((a, b) =>
              new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
            )
            .map((a) => (
              <li key={a._id} className="p-3 border rounded shadow-sm bg-white">
                <div className="border p-4 rounded shadow-sm bg-white space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong> {a.createdAt ? new Date(a.createdAt).toLocaleString() : 'Unknown'}
                  </p>
                  <audio controls src={a.audioUrl} className="w-full" />
                  <p><strong>Score:</strong> {a.score ?? 'N/A'}</p>
                  <p><strong>Feedback:</strong> {a.feedback ?? 'Pending'}</p>
                   <button
                    onClick={() => handleDeleteAttempt(a._id)}
                    className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 hover:underline font-medium transition-colors cursor-pointer"
                  >
                    🗑 Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
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