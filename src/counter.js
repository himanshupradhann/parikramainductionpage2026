import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {getFirestore,doc,getDoc,setDoc,increment} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { config } from "./server/firebase.js";

const firebaseConfig = config;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const visitorElement = document.getElementById("visitorCount");

async function updateVisitorCount() {
  try {
    const ref = doc(db, "visitors", "total");
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      await setDoc(
        ref,
        { count: increment(1) },
        { merge: true }
      );
    } else {
      await setDoc(ref, { count: 1 });
    }

    const updated = await getDoc(ref);

    visitorElement.textContent = updated.data().count;

  } catch (error) {
    console.error("Visitor counter error:", error);
    visitorElement.textContent = "—";
  }
}

updateVisitorCount();