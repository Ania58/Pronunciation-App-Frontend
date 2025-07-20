import { useState } from "react";
import { loginWithEmail } from "../firebase/firebaseAuth";
import GoogleSignInButton from './GoogleSignInButton';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      setMessage("✅ Logged in successfully.");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
      <button
        type="button"
        onClick={GoogleSignInButton}
        className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded cursor-pointer"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
