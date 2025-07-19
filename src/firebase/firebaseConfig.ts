import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBJ3fX6sUT_AOW04YpuT556un63sh-tMY",
  authDomain: "sayright-pronunciation-app.firebaseapp.com",
  projectId: "sayright-pronunciation-app",
  storageBucket: "sayright-pronunciation-app.appspot.com",
  messagingSenderId: "919590572342",
  appId: "1:919590572342:web:c6255a4ba5df9abcbec397",
  measurementId: "G-DSES0XRPGG"
};

export const firebaseApp = initializeApp(firebaseConfig);