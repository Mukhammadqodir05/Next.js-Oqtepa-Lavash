import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAtHgl1lQUti0nM2lGEJCnyxm2QkF_ep94",
  authDomain: "oqtepa-lavash-40211.firebaseapp.com",
  projectId: "oqtepa-lavash-40211",
  storageBucket: "oqtepa-lavash-40211.appspot.com",
  messagingSenderId: "609393827686",
  appId: "1:609393827686:web:8324aabf03ed97417f72a7",
  measurementId: "G-F9VV71TQ3X"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)