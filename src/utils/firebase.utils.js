// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC__5n0B6lOldynU7JSjTyA6UdEzog-ti0",
  authDomain: "hairsncares-7548d.firebaseapp.com",
  projectId: "hairsncares-7548d",
  storageBucket: "hairsncares-7548d.appspot.com",
  messagingSenderId: "797228167223",
  appId: "1:797228167223:web:c90c199d9c1fe964a70fb2",
  measurementId: "G-RHJ8ECK7MK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
    prompt : "select_account "
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);