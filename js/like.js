import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMUj23kl_gBm3OpGGN5cIX__ANPduhbJI",
  authDomain: "mlab-site-8cd43.firebaseapp.com",
  projectId: "mlab-site-8cd43",
  storageBucket: "mlab-site-8cd43.firebasestorage.app",
  messagingSenderId: "1028421037075",
  appId: "1:1028421037075:web:1365841ba85dd21c52e3e6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const btn = document.getElementById("like-btn");
const countEl = document.getElementById("like-count");
if (!btn || !countEl) throw new Error("like elements not found");

const comicId = btn.dataset.id;
const storageKey = "liked_" + comicId;
const liked = localStorage.getItem(storageKey) === "1";

const ref = doc(db, "likes", comicId);

async function loadCount() {
  const snap = await getDoc(ref);
  const count = snap.exists() ? (snap.data().count || 0) : 0;
  countEl.textContent = count;
}

async function handleLike() {
  if (localStorage.getItem(storageKey) === "1") return;
  btn.disabled = true;
  localStorage.setItem(storageKey, "1");
  btn.classList.add("liked");
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { count: increment(1) });
  } else {
    await setDoc(ref, { count: 1 });
  }
  const updated = await getDoc(ref);
  countEl.textContent = updated.data().count;
}

if (liked) {
  btn.classList.add("liked");
  btn.disabled = true;
}

btn.addEventListener("click", handleLike);
loadCount();
