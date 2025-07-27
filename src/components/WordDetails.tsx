import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import type { Word } from '../types/word';
import { useRecorder } from '../hooks/useRecorder';
import { uploadAudio } from '../utils/uploadAudio';
import { useUser } from "../contexts/UserContext";
import Header from '../layout/Header';
import Footer from '../layout/Footer';


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

  const [latestFeedback, setLatestFeedback] = useState<string>('');

  const [statusMessage, setStatusMessage] = useState('');

  const [hasReachedLimit, setHasReachedLimit] = useState(false);

  const { t, i18n } = useTranslation();

  const { user } = useUser();

  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateStatus = async (newStatus: 'mastered' | 'practice') => {
  try {
    if (!word || !word.id) return;
    await api.post(`/words/${word.id}/status`, { status: newStatus, userId: user?.uid });
    setWord((prevWord) => {
      if (!prevWord) return prevWord;
      return { ...prevWord, status: newStatus };
    });

    setStatusMessage( t('statusSet', { status: t(newStatus === 'mastered' ? 'mastered' : 'practice') }));
    setTimeout(() => setStatusMessage(''), 3000); 

  } catch (err) {
    console.error('Failed to update word status:', err);
  }
};

  const fetchAttempts = async (wordIdParam?: string) => {
    try {
      const finalId = wordIdParam || word?.id || id;
      const res = await api.get(`/pronunciation/${finalId}/attempts`, {
        params: { userId: user?.uid },
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
      userId: user?.uid,
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
      setLatestFeedback(t('limitReached'));
    } else {
      setSubmitStatus('error');
      setLatestFeedback(t('submitError'));
    }
  } finally {
    setTimeout(() => setSubmitStatus('idle'), 3000);
  }
};


const handleDeleteAttempt = async (attemptId: string) => {
  if (!window.confirm(t('confirmDelete'))) return;

  try {
    await api.delete(`/pronunciation/${attemptId}`, {
      params: { userId: user?.uid },
    });

    const updatedAttempts = attempts.filter((a) => a._id !== attemptId);
    setAttempts(updatedAttempts);

    if (updatedAttempts.length === 0 && word?.id) {
      try {
        await api.delete(`/words/${word.id}/status`, {
          params: { userId: user?.uid },
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
        fetchAttempts(data.id);
      })
      .catch(() => {
        console.error("Error fetching word:", error);
        setError(t('wordNotFound'));
        setLoading(false);
      });
  }, [id, i18n.language]);

  if (loading) return <p className="text-center text-gray-500">{t('loading')}</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!word) return null;

  
  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-indigo-200 via-violet-100 to-cyan-100 px-4 py-12 sm:px-8 md:px-16 flex flex-col items-center justify-between transition-all duration-700 ease-in-out animate-fade-in">
        <div className="w-full max-w-7xl bg-white/60 rounded-3xl shadow-xl p-6 sm:p-10 backdrop-blur-md animate-slide-in-up duration-700 ease-out">

          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(from)}
              className="text-indigo-700 hover:text-indigo-500 hover:underline font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              ← {t('goBack')}
            </button>
          </div>

          <h2 className="text-4xl font-extrabold mb-6 tracking-wide text-center text-indigo-800 animate-fade-in delay-100">
            {word.word}
          </h2>

          <div className="text-center space-y-1 text-indigo-700 animate-fade-in delay-200">
            <p><strong>IPA:</strong> {word.ipa}</p>
            <p><strong>{t('language')}:</strong> {word.language}</p>
            {word.category && <p><strong>{t('category')}:</strong> {t(word.category)}</p>}
            {word.difficulty && <p><strong>{t('difficulty')}:</strong> {t(word.difficulty)}</p>}
          </div>

          {audioExists && (
            <div className="flex justify-center my-6 animate-fade-in delay-300">
              <audio
                className="w-full max-w-md"
                controls
                src={`https://api.dictionaryapi.dev/media/pronunciations/en/${word.word}-us.mp3`}
              />
            </div>
          )}

          <div className="bg-gradient-to-r from-indigo-100 via-white to-lime-100 p-6 rounded-lg shadow-md animate-fade-in delay-400 mb-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-800">🎤 {t('practicePrompt')}</h3>
            <p className="text-sm text-gray-700">
              {audioExists ? t('practiceHintWithAudio') : t('practiceHintNoAudio')}
            </p>
          </div>

          {word.status && (
            <p className="text-center text-md text-violet-800 font-semibold mb-6 animate-fade-in delay-500">
              {t('currentStatus')} <strong>{t(word.status)}</strong>
            </p>
          )}

          <div className="bg-gradient-to-br from-lime-100 via-white to-cyan-100 p-6 rounded-lg shadow-md mb-6 animate-fade-in delay-600">
            <h3 className="text-lg font-semibold mb-4 text-indigo-800">{t('submitRecording')}</h3>

            {recordedUrl && (
              <div className="mb-4">
                <p className="text-sm mb-2">{t('preview')}:</p>
                <audio controls src={recordedUrl} className="w-full mb-2" />
                <button
                  onClick={() => {
                    setAudioUrl('');
                    setAudioBlob(null);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded shadow text-sm cursor-pointer transition-all transform hover:scale-105"
                >
                  ❌ {t('deleteRecording')}
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  if (!user) {
                    if (window.confirm(t('auth.loginRequired'))) {
                      navigate('/login', { state: { from: location.pathname + location.search } });
                    }
                    return;
                  }
                  isRecording ? stopRecording() : startRecording();
                }}
                className={`flex-1 px-6 py-3 rounded font-semibold shadow transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isRecording ? '⏹ ' + t('stop') : '🎙 ' + t('start')}
              </button>

              <button
                onClick={() => {
                  if (!user) {
                    if (window.confirm(t('auth.loginRequired'))) {
                      navigate('/login', { state: { from: location.pathname + location.search } });
                    }
                    return;
                  }
                  submitAttempt();
                }}
                disabled={!audioBlob || hasReachedLimit}
                className="flex-1 px-6 py-3 rounded bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all transform hover:scale-105 hover:shadow-lg"
              >
                {t('submit')}
              </button>
            </div>

            <div className="mt-4 text-sm space-y-1">
              {hasReachedLimit && <p className="text-red-600">{t('limitReached')}</p>}
              {submitStatus === 'submitting' && <p className="text-indigo-600">{t('uploading')}</p>}
              {submitStatus === 'success' && <p className="text-green-600">{t('submitted')}</p>}
              {submitStatus === 'error' && <p className="text-red-600">{t('submitError')}</p>}
            </div>
          </div>

          {latestFeedback && (
            <div className="mt-4 p-4 bg-green-50 border border-green-300 text-green-800 rounded shadow animate-fade-in delay-700">
              <strong>{t('aiFeedback')}:</strong> {latestFeedback}
            </div>
          )}

          {statusMessage && (
            <div className="mt-4 p-3 bg-lime-100 border border-lime-300 text-lime-800 rounded shadow text-sm animate-fade-in delay-700">
              {statusMessage}
            </div>
          )}

          <div className="mt-6 animate-fade-in delay-800">
            <h3 className="text-lg font-semibold mb-2 text-indigo-800">🗂 {t('yourAttempts')}</h3>
            {attempts.length === 0 ? (
              <p className="text-sm text-gray-600">{t('noAttempts')}</p>
            ) : (
              <ul className="space-y-4">
                {attempts
                  .slice()
                  .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
                  .map((a) => (
                    <li
                      key={a._id}
                      className="p-4 bg-white/60 rounded shadow transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                    >
                      <p className="text-sm text-gray-700">
                        <strong>{t('date')}:</strong>{' '}
                        {a.createdAt ? new Date(a.createdAt).toLocaleString() : t('unknown')}
                      </p>
                      <audio controls src={a.audioUrl} className="w-full my-2" />
                      <p><strong>{t('score')}:</strong> {a.score ?? 'N/A'}</p>
                      <p><strong>{t('feedback')}:</strong> {a.feedback ?? t('pending')}</p>
                      <button
                        onClick={() => {
                          if (!user) {
                            if (window.confirm(t('auth.loginRequired'))) {
                              navigate('/login', { state: { from: location.pathname + location.search } });
                            }
                            return;
                          }
                          handleDeleteAttempt(a._id);
                        }}
                        className="mt-2 text-sm text-red-600 hover:underline font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-x-1 cursor-pointer"
                      >
                        🗑 {t('delete')}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 animate-fade-in delay-900">
            <button
              onClick={() => {
                if (!user) {
                  if (window.confirm(t('auth.loginRequired'))) {
                    navigate('/login', { state: { from: location.pathname + location.search } });
                  }
                  return;
                }
                updateStatus('mastered');
              }}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 shadow transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              ✅ {t('mastered')}
            </button>

            <button
              onClick={() => {
                if (!user) {
                  if (window.confirm(t('auth.loginRequired'))) {
                    navigate('/login', { state: { from: location.pathname + location.search } });
                  }
                  return;
                }
                updateStatus('practice');
              }}
              className="bg-yellow-300 text-black px-6 py-2 rounded hover:bg-yellow-400 shadow transition-all transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              🕒 {t('practice')}
            </button>
          </div>
        </div>

        <div className="w-full mt-24 pt-16 pb-12 bg-gradient-to-b from-transparent via-indigo-100/70 to-cyan-100/60 animate-fade-in delay-1000">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2 text-sm text-indigo-800 transition-all">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
