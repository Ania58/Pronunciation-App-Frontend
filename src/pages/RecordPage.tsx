import { Link } from 'react-router-dom';
import RecorderWidget from '../features/record/RecorderWidget';

export default function RecordPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">🎤 Practice Your Pronunciation</h1>
      <p className="text-lg mb-6">
        Record yourself saying a word or sentence, and listen to the result.
      </p>

      <RecorderWidget />

      <div className="mt-8">
        <Link
          to="/"
          className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded shadow cursor-pointer"
        >
          ⬅ Back to Main Page
        </Link>
      </div>
    </div>
  );
}

