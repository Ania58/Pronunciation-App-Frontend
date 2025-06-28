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

      <nav className="mt-10">
        <p className="text-2xl font-semibold mb-4">Explore Words</p>

        <div className="mb-6">
          <p className="text-lg font-medium mb-2">By Difficulty</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/words?difficulty=easy" className="block bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded text-center shadow">
              Easy
            </Link>
            <Link to="/words?difficulty=medium" className="block bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded text-center shadow">
              Medium
            </Link>
            <Link to="/words?difficulty=hard" className="block bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded text-center shadow">
              Hard
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium mb-2">By Category</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link to="/words?category=voiceless%20TH" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              Voiceless TH
            </Link>
            <Link to="/words?category=voiced%20TH" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              Voiced TH
            </Link>
            <Link to="/words?category=schwa" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              Schwa
            </Link>
            <Link to="/words?category=diphthongs" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              Diphthongs
            </Link>
            <Link to="/words?category=stress" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              Stress
            </Link>
            <Link to="/words?category=consonant%20clusters" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              Consonant Clusters
            </Link>
            <Link to="/words?category=vowels" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              Vowels
            </Link>
            <Link to="/words?category=other" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              Other
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/words" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow text-center">
            🔍 Browse All Words
          </Link>
          <Link to="/record">Practice Pronunciation</Link>
        </div>
      </nav>

    </div>
  );
}
