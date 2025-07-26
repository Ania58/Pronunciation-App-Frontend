import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { loginWithEmail } from "../firebase/firebaseAuth";
import GoogleSignInButton from './GoogleSignInButton';
import { useTranslation } from "react-i18next";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      setMessage(t("auth.loginSuccess"));
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    } catch (error: any) {
      setMessage(`${t("auth.errorPrefix")} ${error.message}`);
    }
  };

 return (
  <>
    <Header />
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-200 via-lime-100 to-violet-200 p-4 transition-opacity duration-1000 opacity-100">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-10 transform transition-transform duration-700 ease-out translate-y-0">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-700 hover:underline font-medium cursor-pointer transition-opacity duration-300"
          >
            ← {t("goBack")}
          </button>
        </div>

        <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-gray-800 text-center transition-opacity duration-700 delay-200">
          {t("auth.login")}
        </h2>

        <form onSubmit={handleLogin} className="space-y-4 transition-all duration-700 delay-300">
          <input
            type="email"
            placeholder={t("auth.emailPlaceholder")}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("auth.passwordPlaceholder")}
              className="w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            {t("auth.loginButton")}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700 transition-opacity duration-700 delay-500">
            {message}
          </p>
        )}

        <div className="mt-6 transition-opacity duration-700 delay-600">
          <GoogleSignInButton />
        </div>

        <p className="text-sm mt-6 text-center text-gray-800 transition-opacity duration-700 delay-700">
          {t("auth.noAccount")}{" "}
          <Link to="/register" className="text-indigo-700 hover:underline">
            {t("auth.register")}
          </Link>
        </p>
        <p className="text-sm mt-2 text-center transition-opacity duration-700 delay-800">
          <Link to="/reset-password" className="text-indigo-700 hover:underline">
            {t("auth.forgotPasswordQuestion")}
          </Link>
        </p>
      </div>
    </div>
    <Footer />
  </>
);
};

export default Login;
