import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import type { Word } from '../types/word';
import { useRecorder } from '../hooks/useRecorder';
import { uploadAudio } from '../utils/uploadAudio';
import LanguageSwitcher from './LanguageSwitcher';


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
  
  const {isRecording, audioUrl: recordedUrl, audioBlob, setAudioUrl, setAudioBlob, startRecording, stopRecording } = useRecorder();

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const fakeUserId = 'dev-user-001';

  const [latestFeedback, setLatestFeedback] = useState<string>('');

  const [statusMessage, setStatusMessage] = useState('');

  const [hasReachedLimit, setHasReachedLimit] = useState(false);

  const { t, i18n } = useTranslation();


  const updateStatus = async (newStatus: 'mastered' | 'practice') => {
  try {
    if (!word || !word.id) return;
    await api.post(`/words/${word.id}/status`, { status: newStatus, userId: fakeUserId });
    setWord((prevWord) => {
      if (!prevWord) return prevWord;
      return { ...prevWord, status: newStatus };
    });

    setStatusMessage( t('✅ statusSet', { status: t(newStatus === 'mastered' ? 'mastered' : 'practice') }));
    setTimeout(() => setStatusMessage(''), 3000); 

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
        const today = new Date().toDateString();
        const todaysAttempts = res.data.filter((a: Attempt) =>
        new Date(a.createdAt || '').toDateString() === today
      );
      setHasReachedLimit(todaysAttempts.length >= 20);
    } catch (error) {
      console.error('Error fetching attempts:', error);
    }
  };

const submitAttempt = async () => {
  try {
    if (!audioBlob || !id) return;

    setSubmitStatus('submitting');
    setLatestFeedback(''); 

    const file = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
    const cloudUrl = await uploadAudio(file);

    const createRes = await api.post(`/pronunciation/${id}`, {
      userId: fakeUserId,
      wordId: id,
      audioUrl: cloudUrl,
    });

    const newAttemptId = createRes.data.attempt._id;

    const transcribeRes = await api.post(`/pronunciation/${newAttemptId}/transcribe`,{
      audioUrl: cloudUrl,
    });

    const { feedback } = transcribeRes.data;
    setLatestFeedback(feedback); 

    setSubmitStatus('success');
    fetchAttempts(); 
  } catch (error: any) {
    console.error('Error submitting attempt:', error);
      if (error.response?.status === 429) {
      setSubmitStatus('error');
      setLatestFeedback(t('⚠️ limitReached'));
    } else {
      setSubmitStatus('error');
      setLatestFeedback(t('❌ submitError'));
    }
  } finally {
    setTimeout(() => setSubmitStatus('idle'), 3000);
  }
};


const handleDeleteAttempt = async (attemptId: string) => {
  if (!window.confirm(t('confirmDelete'))) return;

  try {
    await api.delete(`/pronunciation/${attemptId}`, {
      params: { userId: fakeUserId },
    });

    const updatedAttempts = attempts.filter((a) => a._id !== attemptId);
    setAttempts(updatedAttempts);

    if (updatedAttempts.length === 0 && word?.id) {
      try {
        await api.delete(`/words/${word.id}/status`, {
          params: { userId: fakeUserId },
        });

        setWord((prev) => prev ? { ...prev, status: undefined } : null);
      } catch (statusErr) {
        console.error('Failed to delete word status after removing last attempt:', statusErr);
      }
    }

  } catch (error) {
    console.error('Failed to delete attempt:', error);
    alert(t('deleteError'));
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
        setError(t('wordNotFound'));
        setLoading(false);
      });
      fetchAttempts();
  }, [id, i18n.language]);

  if (loading) return <p className="text-center text-gray-500">{t('loading')}</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!word) return null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline cursor-pointer">
          ← {t('goBack')}
        </button>
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 {t('home')}
        </Link>
      </div>
      <LanguageSwitcher />
      <h2 className="text-2xl font-bold mb-4">{word.word}</h2>
      <p className="mb-2"><strong>IPA:</strong> {word.ipa}</p>
      <p className="mb-2"><strong>{t('language')}:</strong> {word.language}</p>
      {word.category && <p className="mb-2"><strong>{t('category')}:</strong> {word.category}</p>}
      {word.difficulty && <p className="mb-2"><strong>{t('difficulty')}:</strong> {word.difficulty}</p>}

      {audioExists && (
        <audio className="my-4 w-full" controls src={`https://api.dictionaryapi.dev/media/pronunciations/en/${word.word}-us.mp3`} />
      )}

      <div className="mt-6 p-4 bg-gray-100 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">🎤 {t('practicePrompt')}</h3>
        <p className="mb-4 text-sm text-gray-700">
          {audioExists ? t('practiceHintWithAudio') : t('practiceHintNoAudio')}
        </p>
      </div>


      {word.status && (
        <p className="text-sm text-gray-700 mb-2">
          {t('currentStatus')} <strong>{t(word.status)}</strong>
        </p>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="font-semibold mb-2">{t('submitRecording')}</h3>
        {recordedUrl && (
          <div className="mt-4 space-y-2">
            <p className="text-sm mb-1">{t('preview')}:</p>
            <audio controls src={recordedUrl} className="w-full" />
            <button
              onClick={() => {
                setAudioUrl('');
                setAudioBlob(null);
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow cursor-pointer text-sm"
            >
              ❌ {t('deleteRecording')}
            </button>
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
            {isRecording ? '⏹ ' + t('stop') : '🎙 ' + t('start')}
          </button>

          <button
            onClick={submitAttempt}
            disabled={!audioBlob || hasReachedLimit}
            className="flex-1 px-6 py-3 rounded bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
             {t('submit')}
          </button>
          {hasReachedLimit && (
            <p className="text-red-600 text-sm mt-2">
              ⚠️ {t('limitReached')}
            </p>
          )}
          {submitStatus === 'submitting' && (
            <p className="text-blue-600 text-sm mt-2">{t('uploading')}</p>
          )}
          {submitStatus === 'success' && (
            <p className="text-green-600 text-sm mt-2">✅ {t('submitted')}</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-sm mt-2">❌ {t('submitError')}</p>
          )}
        </div>
      </div>
      {latestFeedback && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-800 rounded shadow">
          <strong>{t('aiFeedback')}:</strong> {latestFeedback}
        </div>
      )}
      {statusMessage && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-800 rounded shadow text-sm">
          {statusMessage}
        </div>
      )}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">🗂 {t('yourAttempts')}</h3>
        {attempts.length === 0 ? (
          <p className="text-sm text-gray-500">{t('noAttempts')}</p>
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
                    <strong>{t('date')}:</strong> {a.createdAt ? new Date(a.createdAt).toLocaleString() : t('unknown')}
                  </p>
                  <audio controls src={a.audioUrl} className="w-full" />
                  <p><strong>{t('score')}:</strong> {a.score ?? 'N/A'}</p>
                  <p><strong>{t('feedback')}:</strong> {a.feedback ?? t('pending')}</p>
                   <button
                    onClick={() => handleDeleteAttempt(a._id)}
                    className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 hover:underline font-medium transition-colors cursor-pointer"
                  >
                    🗑 {t('delete')}
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
          ✅ {t('mastered')}
        </button>
        <button
          onClick={() => updateStatus('practice')}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 cursor-pointer"
        >
          🕒 {t('practice')}
        </button>
      </div>
    </div>
  );
}