
// Sidebar Toggle Codes;
   // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        
        var firebaseConfig = {
            apiKey: "AIzaSyA7nxs8uTXRsIJFQL0BfMr0gRxX0C_QLyo",
            authDomain: "crisisit-645c6.firebaseapp.com",
            projectId: "crisisit-645c6",
            storageBucket: "crisisit-645c6.appspot.com",
            messagingSenderId: "628069220231",
            appId: "1:628069220231:web:6aa5b13bff76a7e6599d22",
            measurementId: "G-SJ2TXDFR41"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();

  // var db = firebase.database();
  // var auth = firebase.auth();
// var firebase = require('firebase');


var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
var sidebarCloseIcon = document.getElementById("sidebarIcon");
var loginButton = document.getElementById("loginId");
let appendIdTo = document.getElementById("appendIdTo");
let appendToTable = document.getElementById("appendToTable");


console.log(loginButton);

loginButton.addEventListener("click", function(){
  let emailValue = document.getElementById("email").value;
let passwordValue = document.getElementById("password").value;
  loginUser(emailValue, passwordValue);
});

function toggleSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar_responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar_responsive");
    sidebarOpen = false;
  }
}


// The section of the delete popup
// When the user clicks on div, open the popup
function myFunction() {
  var popup = document.getElementById("pop");
  popup.classList.toggle("show");
}


function loginUser(email, password){
  console.log(email);
  console.log("email");
  if(email.length > 6 && password.length > 5){
    // print("authenticating");
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(value) {
          //NEED TO PULL USER DATA?
          console.log("logged in");
          // redirect("");
          window.location = "dashboard.html";
        }).catch(function(error) {
          // toast(error.message,7000);
        }); 
  }
else{
  console.log("this is being printed");
}

}


function fetchCurrentCrisisData(){
  const booksRef = firebase
  .firestore()
  .collection("crisis");

booksRef
  
  .onSnapshot((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("All data in 'crisis' collection", data); 
    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]

    data.forEach(element => {
      

    appendIdTo.innerHTML += `
    <div class="card">
            <div class="card-image">
              <img src="./assets/Image.svg" alt="Sample photo">

              <div class="card-main">
                <img src="${element.imageUrl}" alt="samples">
              </div>

              <div class="card-footer">
                <div class="circle"></div>
                <h3>${element.title}</h3>
              </div>
            </div>

            <div class="text">
              <div class="texting">
                <p>${element.incidentType}</p>
                <div class="popping" onclick="myFunction()">
                  <i class="fa fa-ellipsis-v"></i>
                  <span class="delete" id="pop">
                    delete
                  </span>
                </div>
              </div>

              <h3>${element.name}</h3>
              <p>${element.details}
              </p>
              <span>${element.time}</span>
              <span>20TH JUN, 2020</span>
            </div>
          </div>
    `;

    });

  });
}
// firebase
//   .firestore()
//   .collection("books")
//   .onSnapshot((snapshot) => {
//     const data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     console.log("All data in 'books' collection", data);
//   });
function fetchCurrentUserData(){
  const booksRef = firebase
  .firestore()
  .collection("users");

booksRef
  .onSnapshot((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("All data in 'users' collection", data); 
    // [ { id: 'glMeZvPpTN1Ah31sKcnj', title: 'The Great Gatsby' } ]

    data.forEach(element => {
      appendToTable.innerHTML += 

      `<tr>
                <td>${element.name}</td>
                <td>${element.email}</td>
            
              </tr>
      
      `;
    });

  });
}

function loginState(){
  var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
  window.location = "dashboard.html";
} else {
  // No user is signed in.
}
}

function loginState(){
  var user = firebase.auth().currentUser;

if (user) {
  // User is signed in.
  // window.location = "dashboard.html";
} else {
  // No user is signed in.
  // window.location = "index.html";

}
}

var logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener('click', e => {
  e.preventDefault();
  firebase.auth().signOut();
  console.log('User signed out!');
  window.location = "index.html";

})

window.onload = function() {
  fetchCurrentCrisisData();
  fetchCurrentUserData();
  setTimeout(()=>{
  loginState();

  }, 1);
};