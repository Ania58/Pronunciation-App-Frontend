import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UserContext";
import { api } from "../services/api";
import ConfirmationModal from "../components/ConfirmationModal";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

export default function DeleteAccountPage() {
  const { t } = useTranslation();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [message, setMessage] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleDelete = async () => {
    if (!user || !user.email) return;

    if (emailInput !== user.email) {
      setMessage(t("account.invalidEmail"));
      return;
    }

    setLoading(true);
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) throw new Error("No authenticated user");

      const credential = EmailAuthProvider.credential(emailInput, passwordInput);
      await reauthenticateWithCredential(currentUser, credential);

      const idToken = await currentUser.getIdToken();

      await api.delete("/users/delete", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      await logout();
      setMessage(t("account.deleteSuccess"));
      setTimeout(() => navigate("/", { replace: true }), 1500);
    } catch (err: any) {
      console.error(err);
      setMessage(
        t("account.deleteError") +
          ": " +
          (err?.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-200 via-lime-100 to-violet-200 px-4 py-10 animate-fade-in">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-10 animate-slide-in-up">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
            {t("account.deleteTitle")}
          </h2>

          <p className="text-sm text-gray-700 mb-4">
            {t("account.deleteWarning")}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setConfirmOpen(true);
            }}
            className="space-y-4"
          >
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder={t("auth.passwordPlaceholder")}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 pr-12"
                required
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600 hover:text-gray-900 focus:outline-none cursor-pointer"
                tabIndex={-1}
            >
                {showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
            </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition cursor-pointer"
            >
              {loading ? t("account.deleting") : t("account.deleteButton")}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-700 transition-opacity duration-700">
              {message}
            </p>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmOpen}
        messageKey="account.confirmFinalDelete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      <Footer />
    </>
  );
}
