import { useUser } from "../contexts/UserContext";

const LogoutButton = () => {
  const { user, logout } = useUser();

  if (!user) return null; 

  return (
    <button
      onClick={logout}
      className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Log out
    </button>
  );
};

export default LogoutButton;
