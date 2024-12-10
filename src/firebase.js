import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBdW5wqsafaim22VYU4KXMmEKf_4WpqS7U",
  authDomain: "marcadordetruco-f1271.firebaseapp.com",
  projectId: "marcadordetruco-f1271",
  storageBucket: "marcadordetruco-f1271.firebasestorage.app",
  messagingSenderId: "5065913202",
  appId: "1:5065913202:web:fcea56bcb67adaefdea3eb",
  measurementId: "G-RZZ49PMX6K",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const onAnalyticsEvent = (eventName) => {
  logEvent(analytics, eventName);
};

export const onFirestoreEvent = (eventName, location) => {
  addDoc(collection(db, "logs"), {
    date: serverTimestamp(),
    location,
    eventName,
  });
};
