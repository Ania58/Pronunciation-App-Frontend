import { useEffect, useState } from 'react';

export const SupportBanner = () => {
  const [visible, setVisible] = useState(false);

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
    <div className="bg-yellow-100 text-gray-900 text-sm px-4 py-3 flex flex-col md:flex-row items-center justify-between border-b border-yellow-300">
      <p className="text-center md:text-left mb-2 md:mb-0">
        💡 This website is powered by my time, creativity, and some AI magic — which all come with a cost. If you enjoy it or find it useful, you can support my work by buying me a coffee. ☕
      </p>
      <div className="flex items-center gap-2">
        <a
          href={import.meta.env.VITE_KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-300 transition"
        >
          Buy me a coffee
        </a>
        <button onClick={dismiss} className="text-xs text-gray-500 hover:underline cursor-pointer">
          Dismiss
        </button>
      </div>
    </div>
  );
};
