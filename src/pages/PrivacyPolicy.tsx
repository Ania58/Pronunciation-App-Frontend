import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline cursor-pointer">
          ← {t('goBack')}
        </button>
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 {t('home')}
        </Link>
      </div>
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold mb-4">{t("privacyPolicy.title")}</h1>
      {(t("privacyPolicy.sections", { returnObjects: true }) as { heading: string; content: string }[]).map(
        (section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{section.heading}</h2>
            <p>{section.content}</p>
          </div>
        )
      )}
    </div>
  );
};

export default PrivacyPolicy;

