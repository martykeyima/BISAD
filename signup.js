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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('signup');


// render User
function renderUsers(user, db) {

    // update for set id
    const washingtonRef = doc(db, "users", user.id);
    console.log(user.id)

    updateDoc(washingtonRef, {
        idu : user.id
    })
}

// event submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = form.username.value;
    await addDoc(collection(db, "users"), {
        username: form.username.value,
        password: form.password.value,
        name: form.name.value,
        address: form.address.value,
        phone: form.phone.value,
        ida : '',
        src : ''
    })

    // reset value to null
    form.username.value = "";
    form.password.value = "";
    form.name.value = "";
    form.address.value = "";
    form.phone.value = "";

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
    window.location.href = "signin.html";
})


const user = document.getElementById('user');
// user.addEventListener('input', async (e) => {
//     console.log('commy')
// });