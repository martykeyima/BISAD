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
const div = document.getElementById('container')
const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log((form.commy.value))
})

// function renderProduct(product) {
//     const img = document.createElement('img');

//     img.setAttribute('src', product.data().src)

//     div.appendChild(img)
// }


// read
// try {
//     const products = collection(db, "history");
//     const q = query(products);
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach(doc => {
//         renderProduct(doc);
//     })
// } catch (error) {
//     throw error
// }

const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}