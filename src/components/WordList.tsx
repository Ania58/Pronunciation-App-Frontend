import { useEffect, useState } from 'react';
import { fetchSampleWords } from '../services/wordService';
import type { Word } from '../types/word';

export default function WordList() {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    fetchSampleWords().then(setWords).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Sample Words</h2>
      <ul>
        {words.map((word) => (
          <li key={word.id}>{word.word}</li>
        ))}
      </ul>
    </div>
  );
}
