import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../contexts/UserContext';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <main className="bg-gradient-to-br from-sky-50 to-indigo-50 min-h-screen px-4 py-12 max-w-6xl mx-auto space-y-12">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-700 hover:text-indigo-700 bg-white hover:bg-indigo-50 px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
        >
          ← {t('goBack') ?? 'Wróć'}
        </button>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/"
            className="text-sm text-gray-700 hover:text-indigo-700 bg-white hover:bg-indigo-50 px-4 py-2 rounded-lg shadow-sm transition"
          >
            🏠 {t('home') ?? 'Strona główna'}
          </Link>
        </div>
      </div>

      <motion.h2
        className="text-4xl font-extrabold text-indigo-900 text-center tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t('title')}
      </motion.h2>

      <motion.section
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-indigo-800 text-center">{t('byDifficulty')}</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/words?difficulty=easy"
            className="px-5 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition"
          >
            {t('easy')}
          </Link>
          <Link
            to="/words?difficulty=medium"
            className="px-5 py-2 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
          >
            {t('medium')}
          </Link>
          <Link
            to="/words?difficulty=hard"
            className="px-5 py-2 rounded-full text-sm font-medium bg-rose-100 text-rose-800 hover:bg-rose-200 transition"
          >
            {t('hard')}
          </Link>
        </div>
      </motion.section>

      <motion.section
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-indigo-800 text-center">{t('byCategory')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/words?category=voiceless%20TH" className="bg-white hover:bg-indigo-50 text-gray-700 border border-indigo-100 px-4 py-2 rounded-lg text-center text-sm font-medium shadow-sm transition">{t('voicelessTH')}</Link>
          <Link to="/words?category=voiced%20TH" className="bg-white hover:bg-indigo-50 text-gray-700 border border-indigo-100 px-4 py-2 rounded-lg text-center text-sm font-medium shadow-sm transition">{t('voicedTH')}</Link>
          <Link to="/words?category=schwa" className="bg-white hover:bg-indigo-50 text-gray-700 border border-indigo-100 px-4 py-2 rounded-lg text-center text-sm font-medium shadow-sm transition">{t('schwa')}</Link>
          <Link to="/words?category=diphthongs" className="bg-white hover:bg-indigo-50 text-gray-700 border border-indigo-100 px-4 py-2 rounded-lg text-center text-sm font-medium shadow-sm transition">{t('diphthongs')}</Link>
          <Link to="/words?category=stress" className="bg-white hover:bg-indigo-50 text-gray-700 border border-indigo-100 px-4 py-2 rounded-lg text-center text-sm font-medium shadow-sm transition">{t('stress')}</Link>
          <Link to="/words?category=consonant%20clusters" className="bg-white hover:bg-indigo-50 text-gray-700 border border-indigo-100 px-4 py-2 rounded-lg text-center text-sm font-medium shadow-sm transition">{t('consonantClusters')}</Link>
          <Link to="/words?category=vowels" className="bg-white hover:bg-indigo-50 text-gray-700 border border-indigo-100 px-4 py-2 rounded-lg text-center text-sm font-medium shadow-sm transition">{t('vowels')}</Link>
          <Link to="/words?category=other" className="bg-white hover:bg-indigo-50 text-gray-700 border border-indigo-100 px-4 py-2 rounded-lg text-center text-sm font-medium shadow-sm transition">{t('other')}</Link>
        </div>
      </motion.section>

      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link to="/words" className="text-white font-semibold px-6 py-3 rounded-xl shadow text-center transition w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
           {t('browseAll')}
        </Link>
        <Link to="/record" className="text-white font-semibold px-6 py-3 rounded-xl shadow text-center transition w-full sm:w-auto bg-purple-600 hover:bg-purple-700">
           {t('micTest')}
        </Link>
        {user && (
          <>
            <Link to="/progress" className="text-white font-semibold px-6 py-3 rounded-xl shadow text-center transition w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
               {t('seeProgress')}
            </Link>
            <Link to="/attempts" className="text-white font-semibold px-6 py-3 rounded-xl shadow text-center transition w-full sm:w-auto bg-fuchsia-600 hover:bg-fuchsia-700">
               {t('yourAttempts')}
            </Link>
          </>
        )}
      </motion.div>
    </main>
  );
}
