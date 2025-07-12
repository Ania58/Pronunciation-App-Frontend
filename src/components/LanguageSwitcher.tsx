import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lng: 'en' | 'pl' | 'es') => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2 justify-end mt-2 px-4">
      {(['en', 'pl', 'es'] as const).map((lng) => (
        <button
          key={lng}
          onClick={() => changeLang(lng)}
          className={
            'px-2 py-1 rounded text-xs border ' +
            (i18n.resolvedLanguage === lng
              ? 'bg-blue-600 text-white cursor-pointer'
              : 'border-gray-300 hover:bg-gray-100 cursor-pointer')
          }
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
