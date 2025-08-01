import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import RecorderWidget from '../features/record/RecorderWidget';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

export default function RecordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-cyan-100 flex flex-col">
        <main className="flex-grow max-w-3xl mx-auto px-4 py-8 animate-fade-in-up transition-all duration-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <button
              onClick={() => navigate(-1)}
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded shadow cursor-pointer transform transition-transform duration-300 hover:scale-105"
            >
              ⬅ {t('goBack')}
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-4 transition-transform hover:scale-105 hover:text-blue-800 duration-300">
            {t('micTest')}
          </h1>
          <p className="text-lg mb-2 transition-opacity hover:opacity-90">{t('micCheckInfo')}</p>
          <p className="text-sm text-gray-600 mb-6 transition-opacity hover:opacity-80">{t('micCheckNote')}</p>

          <div className="transition-transform hover:scale-105 duration-300">
            <RecorderWidget />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}




