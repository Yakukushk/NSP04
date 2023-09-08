// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, setDoc, limit} from 'firebase/firestore';
import {onUnmounted, ref} from "vue"
import {getAnalytics} from "firebase/analytics";
import {noteCollection} from "@/firebase/firebase";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBhzuDUSQxkoZwuadb8X_w3cVBKWcTSfs0",
  authDomain: "vuefirebase-7e2b7.firebaseapp.com",
  projectId: "vuefirebase-7e2b7",
  storageBucket: "vuefirebase-7e2b7.appspot.com",
  messagingSenderId: "984182240823",
  appId: "1:984182240823:web:27e69382732fc2bec1f1b2",
  measurementId: "G-X3WRTVSHYH"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const newsCollection = collection(db, 'news')
export const storageNews = getStorage(app);

export const createNews = async (values) => {
  await addDoc(newsCollection, values)
}
export const deleteNews = async (id) => {
  const noteDocID = doc(newsCollection, id)
  await deleteDoc(noteDocID)
}
export const updateNews = async(id, news) => {
  const noteDocID = doc(newsCollection, id)
  await updateDoc(noteDocID, news)
}
