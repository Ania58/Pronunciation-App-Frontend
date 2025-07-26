import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const SupportBanner = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('supportBannerDismissed');
    if (!hasSeen) setVisible(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('supportBannerDismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-indigo-100 via-violet-100 to-cyan-100 text-indigo-900 text-sm px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b border-indigo-300 shadow-md">
      <p className="font-medium md:mb-0 md:mr-4 md:flex-1">
        {t('supportBanner.message')}
      </p>
      <div className="flex items-center gap-2 flex-shrink-0">
        <a
          href={import.meta.env.VITE_KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          {t('supportBanner.button')}
        </a>
        <button
          onClick={dismiss}
          className="text-xs text-indigo-500 hover:underline cursor-pointer"
        >
          {t('supportBanner.dismiss')}
        </button>
      </div>
    </div>
  );
};

