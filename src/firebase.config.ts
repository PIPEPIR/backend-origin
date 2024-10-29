// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD_MS3LgyGoL7qkYIb9bCAloUPSfT7UHLY',
  authDomain: 'origin-db-ce9ff.firebaseapp.com',
  projectId: 'origin-db-ce9ff',
  storageBucket: 'origin-db-ce9ff.appspot.com',
  messagingSenderId: '164201282293',
  appId: '1:164201282293:web:612d233628087c48f0e3bc',
  databaseURL:
    'https://origin-db-ce9ff-default-rtdb.asia-southeast1.firebasedatabase.app',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app);
