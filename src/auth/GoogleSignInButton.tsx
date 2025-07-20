import { useState } from "react";
import { signInWithGoogle } from "../firebase/firebaseAuth";
import { useTranslation } from "react-i18next";

const GoogleSignInButton = () => {
  const [message, setMessage] = useState("");

  const { t } = useTranslation();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setMessage(t("auth.googleSuccess"));
    } catch (error: any) {
      setMessage(`${t("auth.errorPrefix")} ${error.message}`);
    }
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
      >
         {t("auth.googleSignIn")}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default GoogleSignInButton;
