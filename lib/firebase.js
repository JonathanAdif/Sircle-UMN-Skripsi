// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlCgxbMVNAPoonrv8i51pIYhUpP6XEhkk",
  authDomain: "sircle-umn-skripsi.firebaseapp.com",
  projectId: "sircle-umn-skripsi",
  storageBucket: "sircle-umn-skripsi.appspot.com",
  messagingSenderId: "253930735675",
  appId: "1:253930735675:web:d2db83005f13ac96e5341e",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { app, db, auth, storage };

// fungsi untuk cek status autentikasi via firebase 
export const authentication = () => {
  return auth;
};

// fungsi untuk login dengan email dan password via firebase 
export const SignIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// fungsi untuk logout via firebase 
export const SignOut = async () => {
  await signOut(auth);
};

// fungsi untuk error message sistem login via firebase
export const GetSignInErrorMessage = (code) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'Email tidak terdaftar'
    case 'auth/wrong-password':
    default:
      return 'Email atau password salah'
  }
}