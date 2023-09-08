// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, setDoc, limit} from 'firebase/firestore';
import {onUnmounted, ref} from "vue"
import {getAnalytics} from "firebase/analytics";
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
export const db = getFirestore(app)
export const noteCollection = collection(db, 'notes')
export const procentCollection = collection(db, 'percent')
export const phoneCollection = collection(db,'phones')


// @ts-ignore
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
  swal(`Deleted`)

};

// @ts-ignore
export const updateNote = async (id, note) => {
  const noteDocID = doc(noteCollection, id)
  await updateDoc(noteDocID, note);
}

// #region
// export const getNote = async (noteId) => {
//
//   const noteDocRef = doc(db, 'notes', noteId);
//   const noteDoc = await getDoc(noteDocRef);
//
//   if (noteDoc.exists()) {
//     return {id: noteDoc.id, ...noteDoc.data()};
//   } else {
//     console.log(`Note with ID ${noteId} does not exist.`);
//     return null;
//   }
//
// }

// const analytics = getAnalytics(app);
