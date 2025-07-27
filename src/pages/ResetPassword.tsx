import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendResetEmail } from "../firebase/firebaseAuth";
import { useTranslation } from "react-i18next";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendResetEmail(email);
      setMessage(t("auth.resetEmailSent"));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      setMessage(`${t("auth.errorPrefix")} ${error.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-br from-cyan-100 via-lime-100 to-indigo-100 flex items-center justify-center px-4 py-12 animate-fade-in">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8 animate-slide-in-up">

          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-700 hover:text-indigo-500 hover:underline font-medium transition duration-300 transform hover:scale-105 cursor-pointer"
            >
              ← {t("goBack")}
            </button>
          </div>

          <h2 className="text-2xl font-extrabold text-center text-indigo-800 mb-6">
            {t("auth.forgotPasswordTitle")}
          </h2>

          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-lime-300 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow transition-all transform hover:scale-105 cursor-pointer"
            >
              {t("auth.sendResetLink")}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-sm text-center text-indigo-800 animate-fade-in">
              {message}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
