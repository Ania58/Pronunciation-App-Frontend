import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerWithEmail } from "../firebase/firebaseAuth";
import GoogleSignInButton from "./GoogleSignInButton";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [message, setMessage] = useState("");

  const { t } = useTranslation();
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      setMessage(t("auth.mustAcceptTerms"));
      return;
    }

    if (password !== confirmPassword) {
      setMessage(t("auth.passwordMismatch"));
      return;
    }

    if (!validatePassword(password)) {
      setMessage(t("auth.weakPassword"));
      return;
    }

    try {
      await registerWithEmail(email, password);
      setMessage(t("auth.registerSuccess"));
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
          ← {t("goBack")}
        </button>
        <Link to="/" className="text-blue-600 hover:underline">
          🏠 {t("home")}
        </Link>
      </div>
      <LanguageSwitcher />
      <h2 className="text-xl font-bold mb-4">{t("auth.register")}</h2>
      <form onSubmit={handleRegister} className="space-y-3">
        <input
          type="email"
          placeholder={t("auth.emailPlaceholder")}
          className="w-full border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("auth.passwordPlaceholder")}
            className="w-full border px-3 py-2 pr-20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:underline cursor-pointer"
          >
            {showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
          </button>
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder={t("auth.confirmPasswordPlaceholder")}
          className="w-full border px-3 py-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={() => setAcceptTerms(!acceptTerms)}
            className="accent-blue-600"
          />
          <span>{t("auth.agreeToTerms")}</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {t("auth.registerButton")}
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-center">{message}</p>}
      <GoogleSignInButton />
      <p className="text-sm mt-4 text-center">
      {t("auth.alreadyHaveAccount")}{" "}
      <Link to="/login" className="text-blue-600 hover:underline">
        {t("auth.login")}
      </Link>
    </p>
    </div>
  );
};

export default Register;

