import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  child,
  get,
  set,
  push,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhjZ1zYPBKw5mxQtUVAB76Py5g66Nun3c",
  authDomain: "cs-4320.firebaseapp.com",
  databaseURL: "https://cs-4320-default-rtdb.firebaseio.com",
  projectId: "cs-4320",
  storageBucket: "cs-4320.appspot.com",
  messagingSenderId: "1059831730619",
  appId: "1:1059831730619:web:0678883c055819bf4a749e",
  measurementId: "G-T0B6FMHQQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const dbRef = ref(database);

async function readDatabase() {
  var x = await get(child(dbRef, `reports/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return x;
}

export function writeUserData(firstName, lastName) {
  push(ref(database, "users/user"), {
    firstName: firstName,
    lastName: lastName,
  });
}

document.getElementById("nameButton").addEventListener("click", submitReport);

function submitReport() {
  writeUserData(
    document.getElementById("fname").value,
    document.getElementById("lname").value
  );
}
