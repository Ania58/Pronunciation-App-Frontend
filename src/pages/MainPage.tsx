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
            SayRight is your AI-powered companion for mastering English word pronunciation. 
            Browse thousands of words with IPA transcriptions, native audio, categories, and difficulty levels. 
            Sign up to record your pronunciation and receive intelligent feedback with improvement tips. 
            Track your progress by saving words you've mastered or need more practice with. 
            Ready to speak clearly and confidently? Let’s get started!
        </p>

        <WordSearchBar />
        <RandomWordWidget />

      </div>
      <Footer />
    </>
  );
}
