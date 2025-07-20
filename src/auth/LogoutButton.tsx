import { useUser } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
  const { user, logout } = useUser();
  const { t } = useTranslation();

  if (!user) return null; 

  return (
    <button
      onClick={logout}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer"

    >
       {t('auth.logout')}
    </button>
  );
};

export default LogoutButton;
