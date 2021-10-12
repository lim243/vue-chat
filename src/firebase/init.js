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
import firebaseConfig from "./firebaseConfig";

initializeApp(firebaseConfig);

const db = getFirestore();

export { db, collection, query, where, onSnapshot, orderBy, doc, setDoc, addDoc };
