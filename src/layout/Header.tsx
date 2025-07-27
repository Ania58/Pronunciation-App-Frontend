import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LogoutButton from '../auth/LogoutButton';
import { useUser } from '../contexts/UserContext';
import { Menu, X } from 'lucide-react'; 

export default function Header() {
  const { t, i18n } = useTranslation();
  const { user } = useUser();

  const [showLearnDropdown, setShowLearnDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLang = (lng: 'en' | 'pl' | 'es') => i18n.changeLanguage(lng);

  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          title={location.pathname !== '/' ? `🏠 ${t('home')}` : undefined}
          className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-indigo-600 transition"
        >
          <img
            src="/logo.png"
            alt="SayRight logo"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <span className="text-2xl font-extrabold tracking-tight">SayRight</span>
        </Link>

        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-gray-700 text-2xl"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className="hidden sm:flex flex-wrap items-center justify-end gap-3">
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
            className="relative group"
            onMouseEnter={() => setShowLearnDropdown(true)}
            onMouseLeave={() => setShowLearnDropdown(false)}
          >
            <button className="text-sm font-semibold text-green-700 bg-green-100 hover:bg-green-200 hover:text-green-900 px-3 py-1.5 rounded-md shadow-sm transition cursor-pointer">
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

          <div className="relative group">
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
          </div>

          {user && (
            <div
              className="relative group"
              onMouseEnter={() => setShowAccountDropdown(true)}
              onMouseLeave={() => setShowAccountDropdown(false)}
            >
              <button className="text-sm font-semibold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 hover:text-indigo-900 px-3 py-1.5 rounded-md shadow-sm transition cursor-pointer">
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
                <Link
                  to="/delete-account"
                  onClick={() => setShowAccountDropdown(false)}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-medium"
                >
                  ❌ {t('account.deleteTitle')}
                </Link>
              </div>
            </div>
          )}

          {!user ? (
            <>
              {location.pathname !== '/login' ? (
                <Link
                  to="/login"
                  state={{ from: location.pathname + location.search }}
                  className="text-sm text-gray-700 hover:text-indigo-600 px-3 py-1 transition"
                >
                  {t('auth.login')}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-indigo-600 px-3 py-1 transition"
                >
                  {t('auth.login')}
                </Link>
              )}

              {location.pathname !== '/register' ? (
                <Link
                  to="/register"
                  state={{ from: location.pathname + location.search }}
                  className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded transition"
                >
                  {t('auth.register')}
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded transition"
                >
                  {t('auth.register')}
                </Link>
              )}

            </>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-3 bg-white border-t border-gray-200 shadow-md">
          <div className="flex gap-2">
            {(['en', 'pl', 'es'] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => changeLang(lng)}
                className={`text-sm px-2 py-1 rounded border transition ${
                  i18n.resolvedLanguage === lng
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          <Link to="/ipa-guide" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700">
            📘 {t('nav.ipaGuide')}
          </Link>
          <Link to="/pronunciation-patterns" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700">
            🧠 {t('nav.pronunciationPatterns')}
          </Link>
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700">
            📂 {t('nav.dashboard')}
          </Link>
          {user && (
            <>
              <Link to="/progress" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700">
                {t('seeProgress')}
              </Link>
              <Link to="/attempts" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-700">
                {t('yourAttempts')}
              </Link>
              <Link to="/delete-account" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-red-600 font-medium">
                ❌ {t('account.deleteTitle')}
              </Link>
            </>
          )}
          {!user ? (
            <>
              {location.pathname !== '/login' ? (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  state={{ from: location.pathname + location.search }}
                  className="block text-sm text-gray-700"
                >
                  {t('auth.login')}
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-gray-700"
                >
                  {t('auth.login')}
                </Link>
              )}

              {location.pathname !== '/register' ? (
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  state={{ from: location.pathname + location.search }}
                  className="block text-sm text-gray-700"
                >
                  {t('auth.register')}
                </Link>
              ) : (
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-gray-700"
                >
                  {t('auth.register')}
                </Link>
              )}

            </>
          ) : (
            <LogoutButton />
          )}
        </div>
      )}
    </header>
  );
}


