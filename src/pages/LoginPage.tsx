import Login from '../auth/Login';
import { useEffect } from 'react';

export default function LoginPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <Login />;
}
