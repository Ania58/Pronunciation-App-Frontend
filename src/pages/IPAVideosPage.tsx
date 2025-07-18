import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';

const IPAVideosPage = () => {
  const {  i18n, t } = useTranslation();
  const lang = i18n.language;
  const basePath = '/subtitles';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
            <Link to="/" className="text-blue-600 hover:underline">
            🏠 {t('home')}
            </Link>
      </div>
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold mb-4">{t('ipa.title')}</h1>
      
      <p className="mb-6">
        {t('ipa.intro')}
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('ipa.consonantsTitle')}</h2>
        <div className="w-full h-[480px]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/OIl6fp6Qqoo?si=Mc8LdKy4xGS1cbHq"
            title="IPA Consonants"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t('ipa.vowelsTitle')}</h2>
        <div className="w-full h-[480px]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/A6tkyCsCF8c?si=MSxYo7t9OlY6Rw4X"
            title="IPA Vowels & Diphthongs"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">{t('ipa.subtitlesHeading')}</h3>
        <p className="mb-4">{t('ipa.subtitlesText')}</p>
        <p className="mb-4">{t('ipa.subtitleNote')}</p>
        <p className="mb-6">{t('ipa.extraNote')}</p>

        <div className="flex flex-col gap-4">
            <img src={`${basePath}/gear.jpg`} alt={t('ipa.altGear')}  loading="lazy" />
            <img src={`${basePath}/english-auto.jpg`} alt={t('ipa.altEnglishAuto')} loading="lazy" />

            {lang === 'en' && (
            <img src={`${basePath}/english-subtitles.jpg`} alt={t('ipa.altEnglishSubs')} loading="lazy" />
            )}

            {(lang === 'pl' || lang === 'es') && (
                <img src={`${basePath}/auto-translate.jpg`} alt={t('ipa.altAutoTranslate')}  loading="lazy" />
            )}

            {lang === 'pl' && (
            <>
                <img src={`${basePath}/choose-polish.jpg`} alt={t('ipa.altChoosePolish')} loading="lazy" />
                <img src={`${basePath}/polish-subtitles.jpg`} alt={t('ipa.altPolishSubs')} loading="lazy" />
            </>
            )}

            {lang === 'es' && (
            <>
                <img src={`${basePath}/choose-spanish.jpg`} alt={t('ipa.altChooseSpanish')}loading="lazy" />
                <img src={`${basePath}/spanish-subtitles.jpg`} alt={t('ipa.altSpanishSubs')} loading="lazy" />
            </>
            )}
        </div>
      </div>
    </div>
  );
};

export default IPAVideosPage;
