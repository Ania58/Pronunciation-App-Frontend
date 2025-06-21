import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Word } from '../types/word';


export default function WordDetails() {
  const { id } = useParams();
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!word) return null;

  return (
    <div>
      <h2>{word.word}</h2>
      <p><strong>IPA:</strong> {word.ipa}</p>
      <p><strong>Language:</strong> {word.language}</p>
      {word.category && <p><strong>Category:</strong> {word.category}</p>}
      {word.difficulty && <p><strong>Difficulty:</strong> {word.difficulty}</p>}
      {audioExists && (
        <audio controls src={`https://api.dictionaryapi.dev/media/pronunciations/en/${word.word}-us.mp3`} />
      )}
      {word.status && (
        <p className="mt-2 text-sm">Current status: <strong>{word.status}</strong></p>
      )}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => updateStatus('mastered')}
          className="bg-green-200 px-2 py-1 rounded hover:bg-green-300"
        >
          ✅ Mastered
        </button>
        <button
          onClick={() => updateStatus('practice')}
          className="bg-yellow-200 px-2 py-1 rounded hover:bg-yellow-300"
        >
          🕒 Needs Practice
        </button>
      </div>
    </div>
  );
}