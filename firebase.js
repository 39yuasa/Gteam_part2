import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyC6GBGv7NvTGX-v7G_bAt1Bv0xOMgtG4Bs",
  authDomain: "gteampart2.firebaseapp.com",
  databaseURL:
    "https://gteampart2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "gteampart2",
  storageBucket: "gteampart2.appspot.com",
  messagingSenderId: "432016999933",
  appId: "1:432016999933:web:bc1e80213584080626c594",
};
const app = initializeApp(firebaseConfig);
export default app;
// const db = getDatabase(app);
// export default db;
