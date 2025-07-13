import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 mt-12">
      <div className="mt-4 flex justify-center space-x-4">
        <Link to="/contact" className="text-gray-600 hover:text-black transition-colors">Contact</Link>
        {/* <Link to="/about" className="text-gray-600 hover:text-black transition-colors">About</Link> */}
      </div>
      <div className="max-w-6xl mx-auto text-center py-6 text-sm text-gray-600">
        © {year} SayRight — {t('footer.rights')}
      </div>
    </footer>
  );
}

