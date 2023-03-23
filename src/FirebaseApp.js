//config for firebase
import { initializeApp, getApps, getApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAw0nxaYjE2YnT4yBx5VNh8qI5rMlU5KV4",
  authDomain: "northcoders-tech-capsule.firebaseapp.com",
  projectId: "northcoders-tech-capsule",
  storageBucket: "northcoders-tech-capsule.appspot.com",
  messagingSenderId: "644686528209",
  appId: "1:644686528209:web:2430a22a34cdeb01a2cff0",
  measurementId: "G-WXHDS9453Y",
};

const firebaseApp = () => {
  // If firebaseApp is not 'ready'==> doesn't return anything then we need to
  //initialise(with our configuration). Otherwise, we can call getApp() to get it.
  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
};

export default firebaseApp;
