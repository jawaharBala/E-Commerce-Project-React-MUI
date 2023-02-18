import { useContext, createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        return setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const userSignin = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const userSignup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const logout = async () => {
    console.log('logout')
    return await signOut(auth);
  };
  const value = {
    user,
    userSignin,
    userSignup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
