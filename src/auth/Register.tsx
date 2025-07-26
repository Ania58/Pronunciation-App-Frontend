import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerWithEmail } from "../firebase/firebaseAuth";
import GoogleSignInButton from "./GoogleSignInButton";
import { useTranslation } from "react-i18next";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [message, setMessage] = useState("");

  const { t, i18n } = useTranslation();
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
    <>
      <Header />
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-200 via-lime-100 to-violet-200 p-4 transition-opacity duration-1000">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-10 transform transition-transform duration-700 translate-y-0">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-indigo-700 hover:underline font-medium cursor-pointer transition-opacity duration-300"
            >
              ← {t("goBack")}
            </button>
          </div>

          <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-gray-800 text-center transition-opacity duration-700">
            {t("auth.register")}
          </h2>

          <form onSubmit={handleRegister} className="space-y-4 transition-opacity duration-700 delay-100">
            <input
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.passwordPlaceholder")}
                className="w-full px-4 py-3 border rounded-lg pr-20 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <label className="flex items-start space-x-2 text-sm leading-tight">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
                className="mt-1 accent-blue-600"
              />
              <span>
                {t("auth.agreeTo")}{" "}
                <a
                  href={
                    i18n.language === "pl"
                      ? "/terms-of-use-pl.pdf"
                      : i18n.language === "es"
                      ? "/terms-of-use-es.pdf"
                      : "/terms-of-use-en.pdf"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t("auth.termsTooltip")}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("auth.terms")}
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              {t("auth.registerButton")}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-700 transition-opacity duration-700 delay-200">
              {message}
            </p>
          )}

          <div className="mt-6 transition-opacity duration-700 delay-300">
            <GoogleSignInButton />
          </div>

          <p className="text-sm mt-6 text-center text-gray-800 transition-opacity duration-700 delay-400">
            {t("auth.alreadyHaveAccount")}{" "}
            <Link to="/login" className="text-indigo-700 hover:underline">
              {t("auth.login")}
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

