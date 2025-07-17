import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';

const AboutMePage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 {t('home')}
        </Link>
        <LanguageSwitcher />
      </div>

      <h1 className="text-3xl font-bold mb-6">{t('about.title')}</h1>

      <div className="flex flex-col md:flex-row items-start gap-6">
        <img
          src="/about-me-photo.jpg"
          alt={t('about.photoAlt')}
          className="w-full md:w-1/3 rounded shadow-md object-cover"
        />
        <div className="text-lg leading-relaxed space-y-4">
          <p>{t('about.paragraph1')}</p>
          <p>{t('about.paragraph2')}</p>
          <p>{t('about.paragraph3')}</p>
          <p>{t('about.paragraph4')}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
