import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase.js";

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  console.log(provider)
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw new Error(error.message);
  }
};

const logout = () => {
  signOut(auth);
};


export { loginWithGoogle, logout }