import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen px-4 py-12 space-y-12 bg-gradient-to-br from-[#D9FAF6] via-white to-[#E0F0FF]">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-700 hover:text-indigo-700 bg-white hover:bg-indigo-50 px-4 py-2 rounded-lg shadow-sm transition cursor-pointer"
        >
          ← {t('goBack')}
        </button>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/"
            className="text-sm text-gray-700 hover:text-indigo-700 bg-white hover:bg-indigo-50 px-4 py-2 rounded-lg shadow-sm transition"
          >
            🏠 {t('home')}
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
          {[
            { cat: 'voiceless%20TH', label: t('voicelessTH') },
            { cat: 'voiced%20TH', label: t('voicedTH') },
            { cat: 'schwa', label: t('schwa') },
            { cat: 'diphthongs', label: t('diphthongs') },
            { cat: 'stress', label: t('stress') },
            { cat: 'consonant%20clusters', label: t('consonantClusters') },
            { cat: 'vowels', label: t('vowels') },
            { cat: 'other', label: t('other') },
          ].map(({ cat, label }) => (
            <Link
              key={cat}
              to={`/words?category=${cat}`}
              className="bg-white/90 hover:bg-indigo-50 text-gray-700 border border-indigo-100 px-4 py-2 rounded-lg text-center text-sm font-medium shadow-sm transition"
            >
              {label}
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.div
        className="flex flex-wrap gap-4 justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/words"
          className="text-white font-semibold px-6 py-3 rounded-xl shadow text-center transition w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
        >
          {t('browseAll')}
        </Link>
        <Link
          to="/record"
          className="text-white font-semibold px-6 py-3 rounded-xl shadow text-center transition w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
        >
          {t('micTest')}
        </Link>
      </motion.div>
    </main>
  );
}

