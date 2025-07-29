import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();

  const linkedinUrl =
    i18n.language === 'es'
      ? 'https://www.linkedin.com/in/anna-heliasz-dev/'
      : 'https://www.linkedin.com/in/anna-heliasz-dev/?locale=en_US';

  const termsUrl =
    i18n.language === 'pl'
      ? '/terms-of-use-pl.pdf'
      : i18n.language === 'es'
      ? '/terms-of-use-es.pdf'
      : '/terms-of-use-en.pdf';

  return (
    <footer className="w-full bg-gradient-to-br from-[#D9FAF6] via-white to-[#E0F0FF] px-4 sm:px-0">
      <div className="flex flex-col items-center space-y-2 pt-6 text-center">
        <Link
          to="/contact"
          className="text-indigo-700 hover:text-indigo-900 hover:underline transition-colors text-sm sm:text-base"
        >
          {t('contactPage')}
        </Link>
        <Link
          to="/about-me"
          className="text-indigo-700 hover:text-indigo-900 hover:underline transition-colors text-sm sm:text-base"
        >
          {t('footer.aboutMe')}
        </Link>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-700 hover:text-indigo-900 hover:underline transition-colors text-sm sm:text-base"
        >
          LinkedIn
        </a>
        <a
          href={termsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-700 hover:text-indigo-900 hover:underline transition-colors text-sm sm:text-base"
        >
          {t('footer.terms')}
        </a>
        <Link
          to="/privacy-policy"
          className="text-indigo-700 hover:text-indigo-900 hover:underline transition-colors text-sm sm:text-base"
        >
          {t('footer.privacy')}
        </Link>
      </div>
      <div className="text-center py-6 px-4 sm:px-0 text-indigo-600 text-xs sm:text-sm leading-relaxed">
        <div>
          © {year} SayRight — {t('footer.createdBy')}{' '}
          <Link
            to="/about-me"
            className="hover:underline hover:text-indigo-900 transition-colors"
          >
            {t('footer.name')}
          </Link>
          .
        </div>
        <div className="mt-1.5">{t('footer.partOfGottaSpeak')}</div>
      </div>
    </footer>
  );
}


