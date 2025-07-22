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
    <footer className="w-full bg-gray-100 mt-12">
      <div className="mt-4 flex flex-col items-center space-y-2">
        <Link
          to="/contact"
          className="text-gray-600 hover:text-black hover:underline transition-colors"
        >
          {t('contactPage')}
        </Link>
        <Link
          to="/about-me"
          className="text-gray-600 hover:text-black hover:underline transition-colors"
        >
          {t('footer.aboutMe')}
        </Link>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black hover:underline transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={termsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black hover:underline transition-colors"
        >
          {t('footer.terms')}
        </a>

        <Link
          to="/privacy-policy"
          className="text-gray-600 hover:text-black hover:underline transition-colors"
        >
          {t('footer.privacy')}
        </Link>
      </div>
      <div className="max-w-6xl mx-auto text-center py-6 text-sm text-gray-600">
        © {year} SayRight — {t('footer.createdBy')}{' '}
        <Link
          to="/about-me"
          className="hover:underline hover:text-black transition-colors"
        >
          {t('footer.name')}
        </Link>
        .
      </div>
    </footer>
  );
}

