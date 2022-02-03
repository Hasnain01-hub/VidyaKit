
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyC6_FCg3MA_z06VmZgZALYhN578aXk1jCs",
  authDomain: "vidyakit-3b0d0.firebaseapp.com",
  projectId: "vidyakit-3b0d0",
  storageBucket: "vidyakit-3b0d0.appspot.com",
  messagingSenderId: "1055048882925",
  appId: "1:1055048882925:web:15ddb393a6af7f1b998ae4"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const db = app.firestore();
export const logout = () => {
  auth.signOut();
};