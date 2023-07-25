import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyA_4llFzNaNO4a6nSZcUoC3U-dqDXECGq4",
  authDomain: "authapp15june23-e6e26.firebaseapp.com",
  databaseURL: "https://authapp15june23-e6e26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "authapp15june23-e6e26",
  storageBucket: "authapp15june23-e6e26.appspot.com",
  messagingSenderId: "13536741010",
  appId: "1:13536741010:web:e981b102a7ad26f9aa084b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;
