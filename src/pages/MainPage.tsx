import { Link } from 'react-router-dom';
import RandomWordWidget from '../components/RandomWordWidget';
import WordSearchBar from '../components/WordSearchBar';

export default function MainPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to SayRight</h1>

      <p className="mb-6 text-lg">
        SayRight helps you master English word pronunciation. Explore words with their IPA transcriptions, audio, categories, and difficulty levels. Track your progress by marking words as mastered or for practice. Start with a random word or browse the full collection!
      </p>

      <WordSearchBar />
      <RandomWordWidget />

      <nav className="mt-6">
        <p className="text-lg mb-2 font-medium">Explore:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <Link to="/words" className="text-blue-600 underline hover:text-blue-800">
              Browse All Words
            </Link>
          </li>
          <li>
            <Link to="/words?difficulty=easy" className="text-blue-600 underline hover:text-blue-800">
              Easy Words
            </Link>
          </li>
          <li>
            <Link to="/words?difficulty=medium" className="text-blue-600 underline hover:text-blue-800">
              Medium Words
            </Link>
          </li>
          <li>
            <Link to="/words?difficulty=hard" className="text-blue-600 underline hover:text-blue-800">
              Hard Words
            </Link>
          </li>
          <li>
            <Link to="/words?category=voiceless%20TH" className="text-blue-600 underline hover:text-blue-800">
              Voiceless TH
            </Link>
          </li>
          <li>
            <Link to="/words?category=voiced%20TH" className="text-blue-600 underline hover:text-blue-800">
              Voiced TH
            </Link>
          </li>
          <li>
            <Link to="/words?category=schwa" className="text-blue-600 underline hover:text-blue-800">
              Schwa
            </Link>
          </li>
          <li>
            <Link to="/words?category=diphthongs" className="text-blue-600 underline hover:text-blue-800">
              Diphthongs
            </Link>
          </li>
          <li>
            <Link to="/words?category=stress" className="text-blue-600 underline hover:text-blue-800">
              Stress
            </Link>
          </li>
          <li>
            <Link to="/words?category=consonant%20clusters" className="text-blue-600 underline hover:text-blue-800">
              Consonant Clusters
            </Link>
          </li>
          <li>
            <Link to="/words?category=vowels" className="text-blue-600 underline hover:text-blue-800">
              Vowels
            </Link>
          </li>
          <li>
            <Link to="/words?category=other" className="text-blue-600 underline hover:text-blue-800">
              Other
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
