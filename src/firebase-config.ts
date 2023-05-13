import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAdEOb60uQKfJz8AwfxHKiCANXV4_p1K20',
  authDomain: 'chatapp-cde33.firebaseapp.com',
  projectId: 'chatapp-cde33',
  storageBucket: 'chatapp-cde33.appspot.com',
  messagingSenderId: '278862597028',
  appId: '1:278862597028:web:4fb18991023432a5d50f31'
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default database;
