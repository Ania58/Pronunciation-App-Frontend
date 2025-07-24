/*import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoutButton from '../auth/LogoutButton';
import { useUser } from '../contexts/UserContext';


export default function Header() {
  const { t, i18n } = useTranslation();

  const changeLang = (lng: 'en' | 'pl' | 'es') => i18n.changeLanguage(lng);

  const { user } = useUser();

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

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 flex-wrap">
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
          {user && (
            <>
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
            </>
          )}
          <Link
            to="/ipa-guide"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded shadow text-center w-full sm:w-auto"
          >
            {t('nav.ipaGuide')}
          </Link>
          <Link
            to="/pronunciation-patterns"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded shadow text-center w-full sm:w-auto"
          >
            {t('nav.pronunciationPatterns')}
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
        <div className="mt-6 flex gap-4 justify-end">
          {!user && (
            <>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow cursor-pointer"
              >
                {t('auth.register')}
              </Link>
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow cursor-pointer"
              >
                {t('auth.login')}
              </Link>
            </>
          )}
          {user && <LogoutButton />}
        </div>
      </div>
    </header>
  );
}*/

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LogoutButton from '../auth/LogoutButton';
import { useUser } from '../contexts/UserContext';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { user } = useUser();

  const [showLearnDropdown, setShowLearnDropdown] = useState(false);

  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  const changeLang = (lng: 'en' | 'pl' | 'es') => i18n.changeLanguage(lng);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 text-xl font-bold text-gray-800 hover:text-indigo-600 transition"
        >
          <img
            src="/logo.png"
            alt="SayRight logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <span className="text-2xl font-extrabold tracking-tight">SayRight</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          {(['en', 'pl', 'es'] as const).map((lng) => (
            <button
              key={lng}
              onClick={() => changeLang(lng)}
              className={`text-sm px-2 py-1 rounded border transition cursor-pointer ${
                i18n.resolvedLanguage === lng
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {lng.toUpperCase()}
            </button>
          ))}

          <div
            className="relative group hidden sm:block"
            onMouseEnter={() => setShowLearnDropdown(true)}
            onMouseLeave={() => setShowLearnDropdown(false)}
          >
            <button
              className="text-sm font-semibold text-green-700 bg-green-100 hover:bg-green-200 hover:text-green-900 px-3 py-1.5 rounded-md shadow-sm transition cursor-pointer"
            >
              {t('nav.learn')} <span className="ml-1">▼</span>
            </button>

            <div
              className={`absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-md z-50 transition-opacity duration-200 ${
                showLearnDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              <Link
                to="/ipa-guide"
                onClick={() => setShowLearnDropdown(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-800 transition"
              >
                📘 {t('nav.ipaGuide')}
              </Link>
              <Link
                to="/pronunciation-patterns"
                onClick={() => setShowLearnDropdown(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-800 transition"
              >
                🧠 {t('nav.pronunciationPatterns')}
              </Link>
            </div>
          </div>
          <div className="relative group hidden sm:block">
            <Link
              to="/dashboard"
              className="text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-4 py-1.5 rounded-md shadow-md transition"
            >
              📂 {t('nav.dashboard')}
            </Link>

            <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t('byDifficulty')}</p>
              <Link to="/words?difficulty=easy" className="block px-4 py-2 text-sm hover:bg-indigo-50">🟢 {t('easy')}</Link>
              <Link to="/words?difficulty=medium" className="block px-4 py-2 text-sm hover:bg-indigo-50">🟡 {t('medium')}</Link>
              <Link to="/words?difficulty=hard" className="block px-4 py-2 text-sm hover:bg-indigo-50">🔴 {t('hard')}</Link>

              <p className="px-4 pt-3 pb-2 text-xs font-semibold text-gray-500 uppercase border-t">{t('byCategory')}</p>
              <Link to="/words?category=schwa" className="block px-4 py-2 text-sm hover:bg-indigo-50">ə Schwa</Link>
              <Link to="/words?category=stress" className="block px-4 py-2 text-sm hover:bg-indigo-50">📣 {t('stress')}</Link>
              <Link to="/dashboard" className="block px-4 py-2 text-sm text-indigo-600 font-semibold hover:bg-indigo-100">
                → {t('browseAll')}
              </Link>
            </div>
            <Link
              to="/dashboard"
              className="sm:hidden text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-4 py-1.5 rounded-md shadow-md transition animate-bounce"
            >
              📂 {t('nav.dashboard')}
            </Link>
          </div>

          {user && (
            <div
              className="relative group hidden sm:block"
              onMouseEnter={() => setShowAccountDropdown(true)}
              onMouseLeave={() => setShowAccountDropdown(false)}
            >
              <button
                className="text-sm font-semibold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 hover:text-indigo-900 px-3 py-1.5 rounded-md shadow-sm transition cursor-pointer"
              >
                👤 {t('nav.account')} <span className="ml-1">▼</span>
              </button>

              <div
                className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50 transition-opacity duration-200 ${
                  showAccountDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <Link
                  to="/progress"
                  onClick={() => setShowAccountDropdown(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition"
                >
                  {t('seeProgress')}
                </Link>
                <Link
                  to="/attempts"
                  onClick={() => setShowAccountDropdown(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition"
                >
                  {t('yourAttempts')}
                </Link>
              </div>
            </div>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:text-indigo-600 px-3 py-1 transition"
              >
                {t('auth.login')}
              </Link>
              <Link
                to="/register"
                className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded transition"
              >
                {t('auth.register')}
              </Link>
            </>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
    </header>
  );
}

