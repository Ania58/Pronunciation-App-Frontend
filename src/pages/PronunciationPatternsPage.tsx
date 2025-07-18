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
    <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 {t('home')}
        </Link>
      </div>
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold mb-6">{t('patterns.title')}</h1>
      <p className="mb-4">{t('patterns.intro')}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t('patterns.silentTitle')}</h2>
      <table className="w-full table-auto border text-sm mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">{t('patterns.combination')}</th>
            <th className="border px-2 py-1">{t('patterns.pronunciation')}</th>
            <th className="border px-2 py-1">{t('patterns.notes')}</th>
          </tr>
        </thead>
        <tbody>
          {silentCombos.map((row, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{row.combo}</td>
              <td className="border px-2 py-1">{row.sound}</td>
              <td className="border px-2 py-1">{row.example}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t('patterns.soundTitle')}</h2>
      <table className="w-full table-auto border text-sm mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">{t('patterns.combination')}</th>
            <th className="border px-2 py-1">{t('patterns.pronunciation')}</th>
            <th className="border px-2 py-1">{t('patterns.notes')}</th>
          </tr>
        </thead>
        <tbody>
          {soundCombos.map((row, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{row.combo}</td>
              <td className="border px-2 py-1">{row.sound}</td>
              <td className="border px-2 py-1">{row.example}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t('patterns.cautionTitle')}</h2>
      <table className="w-full table-auto border text-sm mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">{t('patterns.combination')}</th>
            <th className="border px-2 py-1">{t('patterns.caution')}</th>
          </tr>
        </thead>
        <tbody>
          {cautionCombos.map((row, index) => (
            <tr key={index}>
              <td className="border px-2 py-1">{row.combo}</td>
              <td className="border px-2 py-1">{row.warning}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-6">{t('patterns.closingNote')}</p>
    </div>
  );
}
