import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import  'firebase/compat/storage';
import 'firebase/compat/auth';
import { seedDatabase } from '../seed';

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from '../seed';

const config = {
};

const firebase = Firebase.initializeApp(config); 
const storage = firebase.storage();
// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

export  { firebase,storage };
