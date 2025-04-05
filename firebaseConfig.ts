import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBblbz0Cb8GBTcD68pzJy2z_JjGPWqALiI",
  authDomain: "yulecervejariadb.firebaseapp.com",
  projectId: "yulecervejariadb",
  storageBucket: "yulecervejariadb.firebasestorage.app",
  messagingSenderId: "122500828486",
  appId: "1:122500828486:web:3f2a07ad0a77e9f8662947",
  measurementId: "G-0R5LH5RK85"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };