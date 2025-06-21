import { Link } from 'react-router-dom';
import RandomWordWidget from '../components/RandomWordWidget';

export default function MainPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to SayRight</h1>

      <p className="mb-6 text-lg">
        SayRight helps you master English word pronunciation. Explore words with their IPA transcriptions, audio, categories, and difficulty levels. Track your progress by marking words as mastered or for practice. Start with a random word or browse the full collection!
      </p>

      <RandomWordWidget />

      <nav className="mt-8 space-y-2">
        <Link
          to="/words"
          className="block text-blue-600 underline hover:text-blue-800"
        >
          Browse All Words
        </Link>
        <Link
          to="/words?category=verbs"
          className="block text-blue-600 underline hover:text-blue-800"
        >
          Filter by Category
        </Link>
        <Link
          to="/words?difficulty=beginner"
          className="block text-blue-600 underline hover:text-blue-800"
        >
          Filter by Difficulty
        </Link>
      </nav>
    </div>
  );
}
