import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sendResetEmail } from "../firebase/firebaseAuth";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    <div className="p-4 max-w-sm mx-auto bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline cursor-pointer">
          ← {t("goBack")}
        </button>
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 {t("home")}
        </Link>
      </div>
      <LanguageSwitcher />
      <h2 className="text-xl font-bold mb-4">{t("auth.forgotPasswordTitle")}</h2>
      <form onSubmit={handleReset} className="space-y-3">
        <input
          type="email"
          placeholder={t("auth.emailPlaceholder")}
          className="w-full border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {t("auth.sendResetLink")}
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
};

export default ResetPassword;
