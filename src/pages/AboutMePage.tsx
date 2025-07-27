import { useTranslation } from 'react-i18next';
import { useNavigate,  useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const AboutMePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const timeout = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-cyan-100 px-4 py-10 flex flex-col items-center">
        <div
          className={`w-full max-w-5xl bg-white/80 border border-gray-200 rounded-xl shadow-lg p-8 transition-all duration-700 ease-in-out ${
            show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } hover:scale-[1.01]`}
        >
          <div className="mb-4">
            <button
              onClick={() => navigate(from)}
              className="text-blue-600 hover:underline cursor-pointer text-sm font-medium"
            >
              ← {t('goBack')}
            </button>
          </div>

          <h1
            className={`text-3xl sm:text-4xl font-bold mb-6 text-center transition-opacity duration-700 ${
              show ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {t('about.title')}
          </h1>

          <div
            className={`flex flex-col md:flex-row items-start gap-6 transition-all duration-700 ease-in-out ${
              show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } hover:scale-[1.02]`}
          >
            <img
              src="/about-me-photo.jpg"
              alt={t('about.photoAlt')}
              className={`w-full md:w-1/3 rounded-lg shadow-md object-cover transform transition-all duration-700 ease-in-out 
                ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'} 
                hover:scale-105 hover:shadow-xl`}
            />
            <div
              className={`text-lg leading-relaxed space-y-4 transform transition-all duration-700 ease-in-out 
                ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'} 
                hover:scale-[1.02] hover:shadow-md`}
            >
              <p>{t('about.paragraph1')}</p>
              <p>{t('about.paragraph2')}</p>
              <p>{t('about.paragraph3')}</p>
              <p>{t('about.paragraph4')}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutMePage;

