import { useState } from "react";
import { signInWithGoogle } from "../firebase/firebaseAuth";

const GoogleSignInButton = () => {
  const [message, setMessage] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setMessage("✅ Signed in with Google successfully.");
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sign in with Google
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
};

export default GoogleSignInButton;
