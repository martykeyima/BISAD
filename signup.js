import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, query, getDocs, doc, setDoc, addDoc, deleteDoc, where, orderBy, onSnapshot, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

// const firebaseConfig = {
//     apiKey: "AIzaSyCScLWvi_oEc0LXcPP2tpLRCgcd2W4TI6Q",
//     authDomain: "commy-testing.firebaseapp.com",
//     projectId: "commy-testing",
//     storageBucket: "commy-testing.appspot.com",
//     messagingSenderId: "713532664743",
//     appId: "1:713532664743:web:9f7257c869c2b506a0a482"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBgkznuHS2cSaFeozSM3bmX44IcOw0QgR4",
    authDomain: "bisad8-near.firebaseapp.com",
    projectId: "bisad8-near",
    storageBucket: "bisad8-near.appspot.com",
    messagingSenderId: "271459657548",
    appId: "1:271459657548:web:7bcc43c6e66f47610291e9"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('signup');
const lisu = [];


function renderUserall(user) {
    lisu.push(user.data().username)
    // console.log(lisu)
}


// render User
function renderUsers(user, db) {

    // update for set id
    const washingtonRef = doc(db, "users", user.id);
    // console.log(user.id)

    updateDoc(washingtonRef, {
        idu: user.id
    })
}

// event submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (lisu.includes(form.username.value)) {
        alert("บอกว่าชื่อใช้ไปแล้วไงเฮ้ย")
        // reset value to null
        form.username.value = "";
        form.password.value = "";
        form.name.value = "";
        form.address.value = "";
        form.phone.value = "";
    } else {
        const username = form.username.value;
        await addDoc(collection(db, "users"), {
            username: form.username.value,
            password: form.password.value,
            name: form.name.value,
            address: form.address.value,
            phone: form.phone.value,
            ida: '',
            src: 'https://www.w3schools.com/howto/img_avatar.png'
        })

        //read for set id
        try {
            const users = collection(db, "users");
            const q = query(users, where("username", "==", username));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
                renderUsers(doc, db);
            })
        } catch (error) {
            throw error
        }

        //goto sign in
        window.location.href = "index.html";
    }

})

//readuserall
try {
    const commy = collection(db, "users");
    const q = query(commy);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderUserall(doc);
    })
} catch (error) {
    throw error
}


const user = document.getElementById('user');
const used = document.getElementById('used');
user.addEventListener('input', async (e) => {
    if (lisu.includes(e.target.value)) {
        $(document).ready(function () {
            $("#used").show(300);
        });
    } else {
        $(document).ready(function () {
            $("#used").hide(300);
        });
    }
});