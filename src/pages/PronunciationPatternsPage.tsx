import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function PronunciationPatternsPage() {
  const { t } = useTranslation();
  
  const silentCombos = t('patterns.silentCombos', { returnObjects: true }) as {
    combo: string;
    sound: string;
    example: string;
  }[];

  const soundCombos = t('patterns.soundCombos', { returnObjects: true }) as {
    combo: string;
    sound: string;
    example: string;
  }[];

  const cautionCombos = t('patterns.cautionCombos', { returnObjects: true }) as {
    combo: string;
    warning: string;
  }[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-cyan-100 px-4 py-10 flex flex-col items-center animate-fade-in">
      <div className="w-full max-w-5xl bg-white/90 border border-cyan-200 rounded-xl shadow-xl p-6 transition-transform hover:scale-[1.01] duration-300">
        <div className="flex justify-between items-center mb-4">
          <Link to="/" className="text-cyan-700 hover:underline text-sm font-medium cursor-pointer">
            🏠 {t('home')}
          </Link>
        </div>

        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-center text-cyan-800 mb-6 hover:scale-105 transition-transform">
          {t('patterns.title')}
        </h1>

        <p className="mb-4 text-lg text-gray-700">{t('patterns.intro')}</p>

        <h2 className="text-2xl font-semibold text-cyan-700 mt-10 mb-3 hover:scale-105 transition-transform">
          {t('patterns.silentTitle')}
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-cyan-200 text-sm rounded-xl shadow-md overflow-hidden">
            <thead className="bg-cyan-100 text-cyan-900">
              <tr>
                <th className="border border-cyan-200 px-4 py-2">{t('patterns.combination')}</th>
                <th className="border border-cyan-200 px-4 py-2">{t('patterns.pronunciation')}</th>
                <th className="border border-cyan-200 px-4 py-2">{t('patterns.notes')}</th>
              </tr>
            </thead>
            <tbody>
              {silentCombos.map((row, index) => (
                <tr key={index} className="even:bg-white odd:bg-cyan-50 hover:bg-cyan-100 transition">
                  <td className="border border-cyan-100 px-4 py-2 text-center">{row.combo}</td>
                  <td className="border border-cyan-100 px-4 py-2 text-center">{row.sound}</td>
                  <td className="border border-cyan-100 px-4 py-2 text-center">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-cyan-700 mt-10 mb-3 hover:scale-105 transition-transform">
          {t('patterns.soundTitle')}
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-cyan-200 text-sm rounded-xl shadow-md overflow-hidden">
            <thead className="bg-cyan-100 text-cyan-900">
              <tr>
                <th className="border border-cyan-200 px-4 py-2">{t('patterns.combination')}</th>
                <th className="border border-cyan-200 px-4 py-2">{t('patterns.pronunciation')}</th>
                <th className="border border-cyan-200 px-4 py-2">{t('patterns.notes')}</th>
              </tr>
            </thead>
            <tbody>
              {soundCombos.map((row, index) => (
                <tr key={index} className="even:bg-white odd:bg-cyan-50 hover:bg-cyan-100 transition">
                  <td className="border border-cyan-100 px-4 py-2 text-center">{row.combo}</td>
                  <td className="border border-cyan-100 px-4 py-2 text-center">{row.sound}</td>
                  <td className="border border-cyan-100 px-4 py-2 text-center">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-cyan-700 mt-10 mb-3 hover:scale-105 transition-transform">
          {t('patterns.cautionTitle')}
        </h2>
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border border-cyan-200 text-sm rounded-xl shadow-md overflow-hidden">
            <thead className="bg-cyan-100 text-cyan-900">
              <tr>
                <th className="border border-cyan-200 px-4 py-2">{t('patterns.combination')}</th>
                <th className="border border-cyan-200 px-4 py-2">{t('patterns.caution')}</th>
              </tr>
            </thead>
            <tbody>
              {cautionCombos.map((row, index) => (
                <tr key={index} className="even:bg-white odd:bg-cyan-50 hover:bg-cyan-100 transition">
                  <td className="border border-cyan-100 px-4 py-2 text-center">{row.combo}</td>
                  <td className="border border-cyan-100 px-4 py-2 text-center">{row.warning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-base text-gray-700">{t('patterns.closingNote')}</p>
      </div>
    </div>
  );
}

