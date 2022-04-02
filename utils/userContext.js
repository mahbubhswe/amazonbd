import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../utils/firebase-config";
const auth = getAuth(app);
const UserAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubcribe();
    };
  }, []);
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth,number,recaptchaVerifier)
  }
  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function userSignOut() {
    return signOut(auth);
  }
  return (
    <UserAuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        googleSignIn,
        userSignOut,
        setUpRecaptcha,
        signInWithPhoneNumber,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserAuthContext);
}
