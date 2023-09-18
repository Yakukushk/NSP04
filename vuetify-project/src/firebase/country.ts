// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {addDoc, collection, deleteDoc, doc, getDoc, getFirestore, setDoc, updateDoc} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth, signOut} from "firebase/auth";
import {useRouter} from "vue-router";
import {useStoragePinia} from "@/pinia/storage";
import {storeToRefs} from "pinia";

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

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

auth.onAuthStateChanged((user) => {
  const store = useStoragePinia();
  const {isAuthenticated} = storeToRefs(store);
  isAuthenticated.value = !!user;
})


export const db = getFirestore(firebaseApp);

export const newsCollection = collection(db, 'news')
export const noteCollection = collection(db, 'notes')
export const percentCollection = collection(db, 'percent')
export const phoneCollection = collection(db, 'phones')
export const storageNews = getStorage(firebaseApp);


export const createNews = async (values) => {
  await addDoc(newsCollection, values)
}
export const deleteNews = async (id) => {
  const noteDocID = doc(newsCollection, id)
  await deleteDoc(noteDocID)
}
export const updateNews = async (id, news) => {
  const noteDocID = doc(newsCollection, id)
  await updateDoc(noteDocID, news)
}
export const createNote = async (note) => {

  await addDoc(noteCollection, note);

};
export const createCountry = async (char, name) => {
  await setDoc(doc(db, 'countries', char), {name: name})
}


// @ts-ignore
export const deleteNote = async (id) => {

  const noteDoc = doc(noteCollection, id);
  await deleteDoc(noteDoc);


};

// @ts-ignore
export const updateNote = async (id, note) => {
  const noteDocID = doc(noteCollection, id)
  await updateDoc(noteDocID, note);
}




export const createPhone = async (phone) => {
  await addDoc(phoneCollection, phone);
  console.log("Component Added");
}

export async function getPercent(percentID) {
  const percentDoc = await getDoc(doc(db, "percent", percentID));
  return percentDoc.exists() ? percentDoc.data().percent : "N/A";
}
