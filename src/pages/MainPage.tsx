import Header from '../layout/Header';
import Footer from '../layout/Footer';
import RandomWordWidget from '../components/RandomWordWidget';
import WordSearchBar from '../components/WordSearchBar';
//import { useTranslation } from 'react-i18next';

export default function MainPage() {
 //const { t } = useTranslation();
  
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to SayRight</h1>

        <p className="mb-6 text-lg">
          SayRight helps you master English word pronunciation. Explore words with their IPA transcriptions, audio, categories, and difficulty levels. Track your progress by marking words as mastered or for practice. Start with a random word or browse the full collection!
        </p>

        <WordSearchBar />
        <RandomWordWidget />

      </div>
      <Footer />
    </>
  );
}
