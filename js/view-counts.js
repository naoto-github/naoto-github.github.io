import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

async function loadAllViewCounts() {
  const snap = await getDocs(collection(db, "views"));
  const counts = {};
  snap.forEach(d => { counts[d.id] = d.data().count || 0; });

  document.querySelectorAll(".comic-card[data-id]").forEach(card => {
    const id = card.dataset.id;
    const el = card.querySelector(".view-num");
    if (el) el.textContent = counts[id] ?? 0;
  });
}

loadAllViewCounts();
