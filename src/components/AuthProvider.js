import React, { useEffect, useState, useContext,  createContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  // Puedes proporcionar el usuario autenticado como contexto para que otros componentes puedan acceder a él.
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default {AuthProvider, AuthContext};
