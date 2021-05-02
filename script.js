
// Sidebar Toggle Codes;
   // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        
       var firebaseConfig = {
    apiKey: "AIzaSyAMfec76EwTJdNmam-mDU8Oc4Sum9bGLQw",
    authDomain: "crisisit-50d24.firebaseapp.com",
    projectId: "crisisit-50d24",
    storageBucket: "crisisit-50d24.appspot.com",
    messagingSenderId: "1021819878537",
    appId: "1:1021819878537:web:5f9e1e2dd7b330094e5a58",
    measurementId: "G-Z2LLZGDMV6"
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
    // console.log("All data in 'crisis' collection", data);
    console.log('this is the data', data) 


    data.forEach(element => {
      const {time,name,details,title,imageUrl,incidentType,mediaType} = element;


      if(mediaType === "MediaType.IMAGE"){
        appendIdTo.innerHTML += `
          <div class="card">
            <div class="card-image">
            <img src="./assets/Image.svg" alt="Sample photo">

              <div class="card-main">
                <img src="${imageUrl}" alt="samples">
              </div>

              <div class="card-footer">
                <div class="circle"></div>
                <h3>${title}</h3>
              </div>
            </div>

            <div class="text">
              <div class="texting">
                <p>${incidentType}</p>
                <div class="popping" onclick="myFunction()">
                  <i class="fa fa-ellipsis-v"></i>
                  <span class="delete" id="pop">
                    delete
                  </span>
                </div>
              </div>

              <h3>${name}</h3>
              <p>${details}</p>
              <span>${time}</span>
              <span>20TH JUN, 2020</span>
            </div>
          </div>
          
        `;
      }

      if(mediaType === "MediaType.AUDIO"){
        appendIdTo.innerHTML += `
      <div class="card">
        <div class="card-image">
        <img src="./assets/Image.svg" alt="Sample photo">

        <div class="card-main">
          <audio controls>
            <source src="${imageUrl}" type="audio/ogg">
            <source src="${imageUrl}" type="audio/mpeg">
          </audio>
        </div>

        <div class="card-footer">
          <div class="circle"></div>
            <h3>${title}</h3>
          </div>
        </div>

        <div class="text">
          <div class="texting">
            <p>${incidentType}</p>
            <div class="popping" onclick="myFunction()">
              <i class="fa fa-ellipsis-v"></i>
              <span class="delete" id="pop">
                delete
              </span>
            </div>
          </div>

          <h3>${name}</h3>
          <p>${details}
          </p>
          <span>${time}</span>
          <span>20TH JUN, 2020</span>
        </div>
      </div>
          
    `;
      }

      if(mediaType === "MediaType.VIDEO"){
        appendIdTo.innerHTML += `
      <div class="card">
        <div class="card-image">
        <img src="./assets/Image.svg" alt="Sample photo">

        <div class="card-main">
          <video width="320" height="240" controls>
            <source src="${imageUrl}" type="video/mp4">
            <source src="${imageUrl}" type="video/ogg">
          </video>
        </div>

        <div class="card-footer">
          <div class="circle"></div>
            <h3>${title}</h3>
          </div>
        </div>

        <div class="text">
          <div class="texting">
            <p>${incidentType}</p>
            <div class="popping" onclick="myFunction()">
              <i class="fa fa-ellipsis-v"></i>
              <span class="delete" id="pop">
                delete
              </span>
            </div>
          </div>

          <h3>${name}</h3>
          <p>${details}
          </p>
          <span>${time}</span>
          <span>20TH JUN, 2020</span>
        </div>
      </div>
          
    `;
      }

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

// function loginState(){
//   var user = firebase.auth().currentUser;

// if (user) {
//   // User is signed in.
//   // window.location = "dashboard.html";
// } else {
//   // No user is signed in.
//   // window.location = "index.html";

// }
// }

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
