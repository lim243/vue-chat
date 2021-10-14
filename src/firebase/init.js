import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
// import store from "../store";

const fbApp = initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth(fbApp);

export {
  auth,
  getAuth,
  createUserWithEmailAndPassword,
  db,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  setDoc,
  addDoc,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
};
