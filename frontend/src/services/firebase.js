import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBE8rCjdvacHCfHR-rEpbdQp2ljrgmHU9A",
  authDomain: "bar-app-utn.firebaseapp.com",
  projectId: "bar-app-utn",
  storageBucket: "bar-app-utn.firebasestorage.app",
  messagingSenderId: "39910297556",
  appId: "1:39910297556:web:f37b0b935f23a6d28e9041"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
