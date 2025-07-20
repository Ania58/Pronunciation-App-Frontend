import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../contexts/UserContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

export default function MinimalHeader() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useUser();

  return (
    <>
      <div className="flex justify-between items-center mt-6 mb-2 flex-wrap gap-y-2">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:underline cursor-pointer"
          >
            ← {t("goBack")}
          </button>
          <Link to="/" className="text-blue-700 font-medium hover:underline">
            🏠 {t("home")}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={logout}
              className="text-red-500 font-medium hover:underline cursor-pointer"
            >
              {t("auth.logout")}
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-indigo-600 font-medium hover:underline"
              >
                {t("auth.login")}
              </Link>
              <Link
                to="/register"
                className="text-indigo-600 font-medium hover:underline"
              >
                {t("auth.register")}
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <LanguageSwitcher />
      </div>
    </>
  );
}