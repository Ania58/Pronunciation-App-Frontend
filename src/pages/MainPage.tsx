import { useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import RandomWordWidget from '../components/RandomWordWidget';
import WordSearchBar from '../components/WordSearchBar';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import sayrightBot from '../assets/sayrightBot.json';


export default function MainPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      <main className="relative bg-gradient-to-br from-[#D9FAF6] via-white to-[#E0F0FF]">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D9FAF6] via-white to-[#E0F0FF] pointer-events-none z-0" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="mx-auto mb-8 w-40 sm:w-48 flex flex-col items-center gap-2">
            <motion.img
              src="/sayright-logo.png"
              alt="SayRight logo"
              className="w-24 sm:w-32 drop-shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <Lottie
              animationData={sayrightBot}
              loop
              className="w-32 sm:w-40"
            />
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('mainTitle')}
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-10 max-w-3xl mx-auto">
            {t('mainDescription')}
          </p>

          <motion.div
            className="flex justify-center mb-10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 w-full max-w-lg">
              <WordSearchBar />
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 w-full max-w-xl">
              <RandomWordWidget />
            </div>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}

