// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);


document.getElementById("uprofile").addEventListener('click', (e) => {
  window.location.href = 'user.html';
});

document.getElementById("signoutbtn").addEventListener('click', (e) => {
  signOut(auth).then(() => {
    alert('Sign out successful!');
  }).catch((error) => {
    alert('Error :(');
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById("signedin").textContent = "Signed into: " + user.email;
    document.getElementById("signoutbtn").style.display = "";
    document.getElementById("uprofile").style.display = "";
  } else {
    document.getElementById("signedin").textContent = "Not signed in";
    document.getElementById("signoutbtn").style.display = "none";
    document.getElementById("uprofile").style.display = "none";
  }
});

submitData.addEventListener('click', (e) => {

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        email: email,
        password: password,
        firstname: "",
        lastname: "",
        cell: "",
        numhours: "",
        address: ""
      })
        .then(() => {
          alert('User created!');
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });
});

submitData2.addEventListener('click', (e) => {

  var email2 = document.getElementById('email2').value;
  var password2 = document.getElementById('password2').value;

  signInWithEmailAndPassword(auth, email2, password2)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      var lgDate = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
      })
        .then(() => {
          alert('User logged in!');
        })
        .catch((error) => {
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });

});