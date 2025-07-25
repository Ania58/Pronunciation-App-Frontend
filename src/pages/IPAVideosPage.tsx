import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';

const IPAVideosPage = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const basePath = '/subtitles';

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-cyan-100 px-4 py-10 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-5xl bg-white/80 border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8 transition-transform hover:scale-[1.01] duration-300">
        <div className="flex justify-between items-center mb-4">
          <Link
            to="/"
            className="text-blue-600 hover:underline cursor-pointer text-sm font-medium"
          >
            🏠 {t('home')}
          </Link>
        </div>

        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">{t('ipa.title')}</h1>

        <p className="mb-6 text-lg text-gray-700">{t('ipa.intro')}</p>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">{t('ipa.consonantsTitle')}</h2>
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/OIl6fp6Qqoo?si=Mc8LdKy4xGS1cbHq"
              title="IPA Consonants"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">{t('ipa.vowelsTitle')}</h2>
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/A6tkyCsCF8c?si=MSxYo7t9OlY6Rw4X"
              title="IPA Vowels & Diphthongs"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">{t('ipa.subtitlesHeading')}</h3>
          <p className="mb-4">{t('ipa.subtitlesText')}</p>
          <p className="mb-4">{t('ipa.subtitleNote')}</p>
          <p className="mb-6">{t('ipa.extraNote')}</p>

          <div className="flex flex-col gap-4">
            <img src={`${basePath}/gear.jpg`} alt={t('ipa.altGear')} className="rounded-lg hover:scale-105 transition duration-300 cursor-pointer" loading="lazy" />
            <img src={`${basePath}/english-auto.jpg`} alt={t('ipa.altEnglishAuto')} className="rounded-lg hover:scale-105 transition duration-300 cursor-pointer" loading="lazy" />

            {lang === 'en' && (
              <img src={`${basePath}/english-subtitles.jpg`} alt={t('ipa.altEnglishSubs')} className="rounded-lg hover:scale-105 transition duration-300 cursor-pointer" loading="lazy" />
            )}

            {(lang === 'pl' || lang === 'es') && (
              <img src={`${basePath}/auto-translate.jpg`} alt={t('ipa.altAutoTranslate')} className="rounded-lg hover:scale-105 transition duration-300 cursor-pointer" loading="lazy" />
            )}

            {lang === 'pl' && (
              <>
                <img src={`${basePath}/choose-polish.jpg`} alt={t('ipa.altChoosePolish')} className="rounded-lg hover:scale-105 transition duration-300 cursor-pointer" loading="lazy" />
                <img src={`${basePath}/polish-subtitles.jpg`} alt={t('ipa.altPolishSubs')} className="rounded-lg hover:scale-105 transition duration-300 cursor-pointer" loading="lazy" />
              </>
            )}

            {lang === 'es' && (
              <>
                <img src={`${basePath}/choose-spanish.jpg`} alt={t('ipa.altChooseSpanish')} className="rounded-lg hover:scale-105 transition duration-300 cursor-pointer" loading="lazy" />
                <img src={`${basePath}/spanish-subtitles.jpg`} alt={t('ipa.altSpanishSubs')} className="rounded-lg hover:scale-105 transition duration-300 cursor-pointer" loading="lazy" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPAVideosPage;

