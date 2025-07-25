import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RecorderWidget from '../features/record/RecorderWidget';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Footer from '../layout/Footer';

export default function RecordPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-cyan-100 flex flex-col">
      <main className="flex-grow max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4"> {t('micTest')}</h1>
        <p className="text-lg mb-2">{t('micCheckInfo')}</p>
        <p className="text-sm text-gray-600 mb-6">{t('micCheckNote')}</p>

        <RecorderWidget />

        <div className="mt-8">
          <Link
            to="/"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded shadow cursor-pointer"
          >
            ⬅ {t('goBack')}
          </Link>
          <LanguageSwitcher />
        </div>
      </main>
      <Footer />
    </div>
  );
}



