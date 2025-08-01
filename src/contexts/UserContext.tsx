import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { getAuth, onAuthStateChanged, onIdTokenChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { firebaseApp } from "../firebase/firebaseConfig";

const auth = getAuth(firebaseApp);

interface UserContextType {
  user: User | null;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken(true);
        localStorage.setItem("authToken", token);
      } else {
        localStorage.removeItem("authToken");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken(true);
        localStorage.setItem("authToken", token);
      }
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
