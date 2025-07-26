import { useUser } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LogoutButton = () => {
  const { user, logout } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.pathname + location.search;

  const [showMessage, setShowMessage] = useState(false);

  if (!user) return null; 

  const handleLogout = async () => {
    await logout();
    navigate(from, { replace: true }); 
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 1500);
  };

  return (
   <div className="flex flex-col items-end">
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 cursor-pointer"
      >
        {t("auth.logout")}
      </button>

      {showMessage && (
        <div className="mt-2 text-green-700 font-medium">
          {t("auth.logoutSuccess")}
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
