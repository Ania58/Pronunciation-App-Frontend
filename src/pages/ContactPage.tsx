import { useState } from 'react';
import { api } from '../services/api'; 
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';

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
      const res = await api.post('/contact', formData);
      setStatus('success');
      setFeedback(res.data.message || t('contact.success'));
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setFeedback(
        err.response?.data?.message || t('contact.error')
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 {t('home')}
        </Link>
      </div>
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold mb-4">{t('contact.title')}</h1>
      <p className="mb-6 text-gray-600">
        {t('contact.description')}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder={t('contact.namePlaceholder')}
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder={t('contact.emailPlaceholder')}
          value={formData.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder={t('contact.subjectPlaceholder')}
          value={formData.subject}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="message"
          placeholder={t('contact.messagePlaceholder')}
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 cursor-pointer"
          disabled={status === 'sending'}
        >
          {status === 'sending' ?  t('contact.sending') : t('contact.send')}
        </button>

        {feedback && (
          <p className={`mt-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {feedback}
          </p>
        )}
      </form>
    </div>
  );
}
