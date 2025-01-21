// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCYMzstR1HWSxe3pr0S0rixvnqglLlLlsg',
  authDomain: 'unslaught-9249d.firebaseapp.com',
  projectId: 'unslaught-9249d',
  storageBucket: 'unslaught-9249d.firebasestorage.app',
  messagingSenderId: '612971112027',
  appId: '1:612971112027:web:8600886c17619acd19017e',
  measurementId: 'G-J28P3KJ0SW',
}

// 612971112027-v6dtb0sk8soe8987rnmb7655rbgv7vfo.apps.googleusercontent.com

// Initialize Firebase
const fr = initializeApp(firebaseConfig)
const db = getFirestore(fr)
const auth = getAuth(fr)

export {
  fr,
  db,
  auth,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
}
