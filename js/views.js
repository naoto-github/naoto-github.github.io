import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMUj23kl_gBm3OpGGN5cIX__ANPduhbJI",
  authDomain: "mlab-site-8cd43.firebaseapp.com",
  projectId: "mlab-site-8cd43",
  storageBucket: "mlab-site-8cd43.firebasestorage.app",
  messagingSenderId: "1028421037075",
  appId: "1:1028421037075:web:1365841ba85dd21c52e3e6"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

const el = document.getElementById("view-count");
if (!el) { console.error("[views.js] #view-count not found"); }

const comicId = el ? el.dataset.id : null;
const sessionKey = "viewed_" + comicId;
const ref = comicId ? doc(db, "views", comicId) : null;

async function loadAndIncrement() {
  if (!el || !ref) return;
  try {
    const snap = await getDoc(ref);
    let count = snap.exists() ? (snap.data().count || 0) : 0;

    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "1");
      count += 1;
      if (snap.exists()) {
        await updateDoc(ref, { count: increment(1) });
      } else {
        await setDoc(ref, { count: 1 });
      }
    }

    el.textContent = count;
  } catch (e) {
    console.error("[views.js] Firestore error:", e.code, e.message);
    el.textContent = "-";
  }
}

loadAndIncrement();
