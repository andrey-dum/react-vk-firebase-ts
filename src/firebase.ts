import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyCWJ0OOiDlgfuyvlvdrY8D5TfceMtKvmv0",
    authDomain: "react-vk-ts.firebaseapp.com",
    projectId: "react-vk-ts",
    storageBucket: "react-vk-ts.appspot.com",
    messagingSenderId: "351651005337",
    appId: "1:351651005337:web:3b170f3c7d2845975e0908"
  };


export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

