import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqMonublihL5G9RLUOHud2qSBc6ovaQOw",
  authDomain: "cds22formula.firebaseapp.com",
  projectId: "cds22formula",
  storageBucket: "cds22formula.firebasestorage.app",
  messagingSenderId: "955523222773",
  appId: "1:955523222773:web:b64ef4edf30c13323049bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);  

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log(name, email, message);

    saveMessage(name, email, message);

    document.getElementById('contactForm').reset();
}

function saveMessage(name, email, message) {
    const messageRef = ref(database, 'messages'); 
    const newMessageRef = push(messageRef);  

    set(newMessageRef, {
        name: name,
        email: email,
        message: message
    })
    .then(() => {
        alert("Message successfully submitted!");
    })
    .catch((error) => {
        console.error("Error submitting message: ", error);
        alert("There was an error submitting your message. Please try again.");
    });
}
