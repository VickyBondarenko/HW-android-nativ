// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKwm1e_zSZDsAbtULBKk2gAWKRd1sgFRE",
  authDomain: "reactnative-391007.firebaseapp.com",
  databaseURL:
    "https://reactnative-391007-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reactnative-391007",
  storageBucket: "reactnative-391007.appspot.com",
  messagingSenderId: "361294161420",
  appId: "1:361294161420:web:e68bc9429135e36ce4f029",
  measurementId: "G-K58B4NX6KL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
