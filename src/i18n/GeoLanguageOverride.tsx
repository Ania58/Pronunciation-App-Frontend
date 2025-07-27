import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';

export default function GeoLanguageOverride() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const detectCountryAndSetLanguage = async () => {
      try {
        const res = await api.get('https://ipapi.co/json/', { baseURL: '' }); 
        const country = res.data.country || '';

        if (country === 'PL') {
            i18n.changeLanguage('pl');
        } else if (
            country === 'ES' ||
            ['AR', 'MX', 'CO', 'PE', 'CL', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY'].includes(country)
        ) {
            i18n.changeLanguage('es');
        } else {
            i18n.changeLanguage('en');
        }

      } catch (err) {
        console.warn('Could not determine location:', err);
      }
    };

    detectCountryAndSetLanguage();
  }, []);

  return null;
}
