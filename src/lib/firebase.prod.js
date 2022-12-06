import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import  'firebase/compat/storage';
import 'firebase/compat/auth';
import { seedDatabase } from '../seed';

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyBd-M_k_vYqDQmonr3rz6KHpUwp0Q2MEW0",
    authDomain: "bookflix-4df5e.firebaseapp.com",
    projectId: "bookflix-4df5e",
    storageBucket: "bookflix-4df5e.appspot.com",
    messagingSenderId: "477313208350",
    appId: "1:477313208350:web:d95e9c918136e9b2b51e0f"
};

const firebase = Firebase.initializeApp(config); 
const storage = firebase.storage();
// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

export  { firebase,storage };