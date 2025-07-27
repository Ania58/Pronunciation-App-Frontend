import Register from '../auth/Register';
import { useEffect } from 'react';

export default function RegisterPage() {
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return <Register />;
}
