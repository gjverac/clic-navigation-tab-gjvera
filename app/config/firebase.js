import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAlUBtgXaTpK6erlJzLlj8JG4HYmcWTRYI",
  authDomain: "clic-app-2aa5b.firebaseapp.com",
  projectId: "clic-app-2aa5b",
  storageBucket: "clic-app-2aa5b.appspot.com",
  messagingSenderId: "1063272133683",
  appId: "1:1063272133683:web:a41fe24a9d08715f611f46"
};

const app = initializeApp(firebaseConfig);
export default firebaseConfig;
export const authentication =getAuth(app);
export const db =getFirestore(app);