import { useState } from "react";
import { registerWithEmail } from "../firebase/firebaseAuth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      setMessage("✅ Registered successfully. You can now log in.");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-3">
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default Register;
