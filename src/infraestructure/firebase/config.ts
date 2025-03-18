import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { configuracionFirebase } from "./firebaseConfig";

const appFirebase = initializeApp(configuracionFirebase);
const db = getFirestore(appFirebase);
export { appFirebase, db };
