import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginWithEmail } from "../firebase/firebaseAuth";
import GoogleSignInButton from './GoogleSignInButton';
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      setMessage(t("auth.loginSuccess"));
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error: any) {
      setMessage(`${t("auth.errorPrefix")} ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white shadow rounded">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline cursor-pointer">
          ← {t('goBack')}
        </button>
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 {t('home')}
        </Link>
      </div>
      <LanguageSwitcher />
      <h2 className="text-xl font-bold mb-4">{t("auth.login")}</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          placeholder={t("auth.emailPlaceholder")}
          className="w-full border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t("auth.passwordPlaceholder")}
          className="w-full border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer"
        >
          {t("auth.loginButton")}
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
      <GoogleSignInButton />
    </div>
  );
};

export default Login;
