import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, set, ref, update, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBhjZ1zYPBKw5mxQtUVAB76Py5g66Nun3c",
  authDomain: "cs-4320.firebaseapp.com",
  databaseURL: "https://cs-4320-default-rtdb.firebaseio.com",
  projectId: "cs-4320",
  storageBucket: "cs-4320.appspot.com",
  messagingSenderId: "1059831730619",
  appId: "1:1059831730619:web:0678883c055819bf4a749e",
  measurementId: "G-T0B6FMHQQD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  document.getElementById("signedin").textContent = "Signed into: " + user.email;
  get(ref(database, 'users/' + user.uid)).then((snapshot) => {
    document.getElementById("fname").value = snapshot.val().firstname;
    document.getElementById("lname").value = snapshot.val().lastname;
    document.getElementById("email").value = snapshot.val().email;
    document.getElementById("phone").value = snapshot.val().cell;
    document.getElementById("hours").value = snapshot.val().numhours;
    document.getElementById("address").value = snapshot.val().address;
  }).catch((error) => {
    console.error(error);
  });
});

updatebtn.addEventListener('click', (e) => {
  var fname = document.getElementById('fname').value;
  var lname = document.getElementById('lname').value;
  var mail = document.getElementById('email').value;
  var cell = document.getElementById('phone').value;
  var hrs = document.getElementById('hours').value;
  var addy = document.getElementById('address').value;
  console.log(fname, lname, mail, cell, hrs, addy);
  writeUserData(fname, lname, mail, cell, hrs, addy);
  alert("User info updated!");
});

function writeUserData(fname, lname, mail, cell, hrs, addy) {
  onAuthStateChanged(auth, (user) => {
    update(ref(database, 'users/' + user.uid), {
      email: mail,
      firstname: fname,
      lastname: lname,
      cell: cell,
      numhours: hrs,
      address: addy
    });
  });
}