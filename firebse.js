// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { env_config } from "./constants";

const firebaseConfig = {
  apiKey: env_config.REACT_APP_API_KEY,
  authDomain: env_config.REACT_APP_AUTH_DOMAIN,
  projectId: env_config.REACT_APP_PROJECT_ID,
  storageBucket: env_config.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: env_config.REACT_APP_MESSAGING_SENDER_ID,
  appId: env_config.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
