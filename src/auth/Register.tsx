import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmail } from "../firebase/firebaseAuth";
import GoogleSignInButton from "./GoogleSignInButton";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      setMessage(t("auth.registerSuccess"));
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {t("auth.registerButton")}
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
      <GoogleSignInButton />
    </div>
  );
};

export default Register;
