import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();

  const changeLang = (lng: 'en' | 'pl' | 'es') => i18n.changeLanguage(lng);

  return (
    <header className="w-full bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-4">{t('title')}</h2>

        <div className="mb-6">
          <p className="text-lg font-medium mb-2">{t('byDifficulty')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/words?difficulty=easy"
              className="block bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded text-center shadow"
            >
              {t('easy')}
            </Link>
            <Link
              to="/words?difficulty=medium"
              className="block bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded text-center shadow"
            >
              {t('medium')}
            </Link>
            <Link
              to="/words?difficulty=hard"
              className="block bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded text-center shadow"
            >
              {t('hard')}
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium mb-2">{t('byCategory')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <Link to="/words?category=voiceless%20TH" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
               {t('voicelessTH')}
            </Link>
            <Link to="/words?category=voiced%20TH" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
               {t('voicedTH')}
            </Link>
            <Link to="/words?category=schwa" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
               {t('schwa')}
            </Link>
            <Link to="/words?category=diphthongs" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              {t('diphthongs')}
            </Link>
            <Link to="/words?category=stress" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
               {t('stress')}
            </Link>
            <Link to="/words?category=consonant%20clusters" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              {t('consonantClusters')}
            </Link>
            <Link to="/words?category=vowels" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
               {t('vowels')}
            </Link>
            <Link to="/words?category=other" className="block bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-center shadow">
              {t('other')}
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/words"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow text-center w-full sm:w-auto"
          >
            {t('browseAll')}
          </Link>
          <Link
            to="/record"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow text-center w-full sm:w-auto"
          >
            {t('practicePronunciation')}
          </Link>
          <Link
            to="/progress"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded shadow text-center w-full sm:w-auto"
          >
            {t('seeProgress')}
          </Link>
          <Link
            to="/attempts"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded shadow text-center w-full sm:w-auto"
          >
            {t('yourAttempts')}
          </Link>
        </div>

        <div className="mt-6 flex gap-2 justify-end">
          {(['en', 'pl', 'es'] as const).map(lng => (
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
      </div>
    </header>
  );
}
