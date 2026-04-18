import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDkgoLhcwRkue_AjUIuCd77vi5pYA_42hE",
  authDomain: "prepzone-e7260.firebaseapp.com",
  projectId: "prepzone-e7260",
  storageBucket: "prepzone-e7260.firebasestorage.app",
  messagingSenderId: "862277982115",
  appId: "1:862277982115:web:2c4d24ba44f7743e406c16"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);