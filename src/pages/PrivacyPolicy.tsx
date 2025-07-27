import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-cyan-100 px-4 py-10 flex flex-col items-center animate-fade-in">
        <div className="w-full max-w-4xl bg-white/80 border border-gray-200 rounded-xl shadow-lg p-8 transition-transform hover:scale-[1.01] duration-300">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:underline cursor-pointer text-sm font-medium"
            >
              ← {t("goBack")}
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
            {t("privacyPolicy.title")}
          </h1>

          {(t("privacyPolicy.sections", { returnObjects: true }) as {
            heading: string;
            content: string;
          }[]).map((section, index) => (
            <div
              key={index}
              className="mb-6 transition-transform duration-300 hover:scale-[1.01]"
            >
              <h2 className="text-lg font-semibold mb-2">{section.heading}</h2>
              <p className="leading-relaxed text-gray-800">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;


