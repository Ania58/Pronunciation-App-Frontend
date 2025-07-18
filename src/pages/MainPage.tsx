import Header from '../layout/Header';
import Footer from '../layout/Footer';
import RandomWordWidget from '../components/RandomWordWidget';
import WordSearchBar from '../components/WordSearchBar';
import { useTranslation } from 'react-i18next';

export default function MainPage() {
 const { t } = useTranslation();
  
  return (
    <>
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <img
          src="/sayright-logo.png"
          alt="SayRight logo"
          className="mx-auto mb-6 w-32 sm:w-40"
        />
        <h1 className="text-3xl font-bold mb-4">{t('mainTitle')}</h1>
        <p className="mb-6 text-lg">{t('mainDescription')}</p>

        <WordSearchBar />
        <RandomWordWidget />

      </div>
      <Footer />
    </>
  );
}
