import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const imageConfig = getStorage(app);

export default imageConfig;



// apiKey: "AIzaSyCBUrDKi_ucixq2-tUHH4i0gdBkgzj0ls0",
// authDomain: "journey-genics.firebaseapp.com",
// projectId: "journey-genics",
// storageBucket: "journey-genics.firebasestorage.app",
// messagingSenderId: "127141438990",
// appId: "1:127141438990:web:bf337745b344a4d4313e5f",