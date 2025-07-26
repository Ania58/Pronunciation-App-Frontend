import { useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { signInWithGoogle } from "../firebase/firebaseAuth";
import { useTranslation } from "react-i18next";

const GoogleSignInButton = () => {
  const [message, setMessage] = useState("");

  const { t } = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/";


  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setMessage(t("auth.googleSuccess"));
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    } catch (error: any) {
      setMessage(`${t("auth.errorPrefix")} ${error.message}`);
    }
  };

  return (
    <div className="mt-4 text-center">
      <div className="flex justify-center">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded shadow hover:bg-gray-100 transition-colors w-full max-w-sm cursor-pointer"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>{t("auth.googleSignIn")}</span>
        </button>
      </div>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default GoogleSignInButton;
