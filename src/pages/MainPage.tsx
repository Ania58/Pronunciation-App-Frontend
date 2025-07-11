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
            SayRight helps you master English pronunciation through interactive learning. Browse words by category or difficulty, see IPA transcriptions, and hear native-like audio. 
            When you sign up, you’ll be able to record yourself and get AI-powered feedback with tips on how to improve. Track your progress by marking words as "mastered" or "practice more" and build your personal learning list.  
            Ready to speak clearly and confidently? Let’s get started!
        </p>

        <WordSearchBar />
        <RandomWordWidget />

      </div>
      <Footer />
    </>
  );
}
