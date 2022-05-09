import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const initializeAuth = () => {
    return initializeApp(firebaseConfig);
}

export default initializeAuth;

