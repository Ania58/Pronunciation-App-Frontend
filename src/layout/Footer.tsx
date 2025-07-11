import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-100 mt-12">
      <div className="max-w-6xl mx-auto text-center py-6 text-sm text-gray-600">
        © {year} SayRight — {t('footer.rights')}
      </div>
    </footer>
  );
}

