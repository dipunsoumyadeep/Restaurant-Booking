  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import {getDatabase, ref, set, child, update, remove} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBwuUIJoBjssrD03NNOla3Nubnc2rlbra4",
    authDomain: "restaurant-901c2.firebaseapp.com",
    databaseURL: "https://restaurant-901c2-default-rtdb.firebaseio.com",
    projectId: "restaurant-901c2",
    storageBucket: "restaurant-901c2.appspot.com",
    messagingSenderId: "779394141170",
    appId: "1:779394141170:web:bc08f9b3d57dde95f1b96b",
    measurementId: "G-JBV027DGYW"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  let submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener('click', insertData);

    function insertData(){
      let restName = document.getElementById("restName").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let size = document.getElementById("size").value;
    let email= document.getElementById("email").value;
    let bookId = Math.random().toString(36).slice(2);
    let letters = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;  
    let email_val = /^([a-zA-Z0-9_\.\-])+\@(([gmail\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let check = document.getElementById("check");
    let size1 = Number(size);

    if(restName == ""|| date == ""|| time == ""|| phone == ""|| size == ""|| email == ""){
      document.getElementById("demo").innerText = "ALL FIELDS ARE MANDATORY* ";
      return;
    }else if(time >= "20:00"|| time <= "08:00"){
      document.getElementById("demo").innerText = "BOOKINGS TIMINGS ARE FROM 08:00 TO 20:00";
      return;
    }else if(!(letters.test(name))){
      document.getElementById("demo").innerText = "NAME MUST CONTAIN ALPHABETS ONLY";
      return;
    }  
    else if (!email_val.test(email)){
      document.getElementById("demo").innerText = "ENTER VALID GMAIL ID"; 
      return;
    }else if(phone.length != 10){
      document.getElementById("demo").innerText = "PHONE NUMBER SHOULD BE OF 10 DIGITS";
      return;
    }else if(size1 >10 || size1 < 1 || size == "0"){
      document.getElementById("demo").innerText = "BOOKING CAN BE DONE FOR 1-10 MEMBERS";
      return;
    }else if(!check.checked){
      return;
    }
      set(ref(db, restName+"/" + bookId),{
            Date : date,
            Time : time,
            Name : name,
            Phone : phone,
            Party_size : size,
            Mail_Id : email
        })
        .then(()=>{
            console.log("Data Stored Successfully!!!")
        })
        .catch((error)=>{
            alert("Error"+ error)
        })
        document.getElementById("demo").innerText = "BOOKING CONFIRMATION IS SENT TO YOUR EMAIL. YOUR BOOKING ID: "+bookId;
        sendEmail(bookId, restName, name, email, date, time);
    }
function sendEmail(bookId, restName, name, email, date, time){
  let params = {
    BookId: bookId,
    RestName: restName,
    Name: name,
    Email: email,
    Date: date,
    Time: time
  };
  const serviceId = "service_fzp6qdh";
  const templateId = "template_7o24rra";
  emailjs.send(serviceId, templateId, params).then((res)=>{
    console.log("SUCCESS!", res);
    // alert("Email Sent Successfully!!");
    }).catch((error)=>{
      console.log("FAILED...", error);
    });
}

