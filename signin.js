import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, query, getDocs, doc, setDoc, addDoc, deleteDoc, where, orderBy, onSnapshot, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCScLWvi_oEc0LXcPP2tpLRCgcd2W4TI6Q",
    authDomain: "commy-testing.firebaseapp.com",
    projectId: "commy-testing",
    storageBucket: "commy-testing.appspot.com",
    messagingSenderId: "713532664743",
    appId: "1:713532664743:web:9f7257c869c2b506a0a482"
};

var idp = sessionStorage.getItem("favoriteMovie");
var idu = sessionStorage.getItem("idu");
console.log('idp', idp)
console.log('idu', idu)

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('signin');

//read
function renderUser (users, username, password) {
    // console.log(users.data().password)
    // console.log(password)

    if ((password == users.data().password)) {

        //pass value to storage
        sessionStorage.setItem("idu", users.id);
        window.location.href = "product.html";
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = form.username.value;
    const password = form.password.value;

    // call read
    try {
        const users = collection(db, "users");
        const q = query(users, where("username", '==', username));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const n = renderUser(doc, username, password);
        })
    } catch (error) {
        throw error
    }
    form.username.value = '';
    form.password.value = '';

});