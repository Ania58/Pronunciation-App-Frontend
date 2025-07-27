import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

export default function ContactPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const navigate = useNavigate();

  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await api.post('/contact', formData);
      setStatus('success');
      setFeedback(t('contact.success'));
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setFeedback(t('contact.error'));
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-cyan-100 px-4 py-10">
        <div className="w-full max-w-xl bg-white/80 border border-gray-200 rounded-xl shadow-lg p-8 transition-transform hover:scale-[1.01] duration-300">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(from)}
              className="text-blue-600 hover:underline text-sm font-medium cursor-pointer"
            >
              ← {t('goBack')}
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {t('contact.title')}
          </h1>
          <p className="text-sm text-gray-700 mb-6">{t('contact.description')}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder={t('contact.namePlaceholder')}
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 transition cursor-pointer"
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t('contact.emailPlaceholder')}
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 transition cursor-pointer"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder={t('contact.subjectPlaceholder')}
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 transition cursor-pointer"
              required
            />
            <textarea
              name="message"
              placeholder={t('contact.messagePlaceholder')}
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300 transition cursor-pointer resize-none"
              required
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-6 py-2 rounded shadow-md font-semibold transition duration-200 cursor-pointer disabled:opacity-50"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? t('contact.sending') : t('contact.send')}
            </button>

            {feedback && (
              <p
                className={`text-sm mt-4 font-medium ${
                  status === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

