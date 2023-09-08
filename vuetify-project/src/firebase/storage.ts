// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  getDocs, getDoc
} from 'firebase/firestore';
import {getStorage} from "firebase/storage"
import {onUnmounted, ref} from "vue"
import {getAnalytics} from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const config = {
  apiKey: "AIzaSyBhzuDUSQxkoZwuadb8X_w3cVBKWcTSfs0",
  authDomain: "vuefirebase-7e2b7.firebaseapp.com",
  projectId: "vuefirebase-7e2b7",
  storageBucket: "vuefirebase-7e2b7.appspot.com",
  messagingSenderId: "984182240823",
  appId: "1:984182240823:web:27e69382732fc2bec1f1b2",
  measurementId: "G-X3WRTVSHYH"
};


const app = initializeApp(config);
export const db = getFirestore(app)

export const percentCollection = collection(db, 'percent')
export const phoneCollection = collection(db, 'phones')

let id = 0;
let percent = 0;

export const createPhone = async (phone) => {
  await addDoc(phoneCollection, phone);
  console.log("Component Added");
}

export async function getPercent(percentID) {
  const percentDoc = await getDoc(doc(db, "percent", percentID));
  return percentDoc.exists() ? percentDoc.data().percent : "N/A";
}
// export const searchPhoneByPercent = async (percentID) => {
//   const q = query(phoneCollection, where('percentID', '==', percentID));
//   const querySnapShot = await getDocs(q);
//   return querySnapShot.docs.map(doc => doc.data());
//
// }
