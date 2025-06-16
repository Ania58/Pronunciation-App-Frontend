import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Word } from '../types/word';


export default function WordDetails() {
  const { id } = useParams();
  const [word, setWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Fetching word with id:", id);
    api.get(`/words/id/${id}`)
      .then(res => {
        console.log("Response data:", res.data);
        setWord(res.data);
        setLoading(false);
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
      {word.audioUrl && <audio controls src={word.audioUrl} />}
    </div>
  );
}