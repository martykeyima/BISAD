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

var idp = sessionStorage.getItem("favoriteMovie");
var idu = sessionStorage.getItem("idu");
console.log('idp', idp)
console.log('idu', idu)

const form = document.getElementById("updateP");
// const h1 = document.getElementById('h1');


function renderProduct(product) {

    // แสดงข้อมูลในช่อง input
    form.src.value = product.data().src;
    form.name.value = product.data().name;
    form.detail.value = product.data().detail;
    form.price.value = product.data().price;


    // update ข้อมูลใหม่เมื่อกด submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        if (form.src.value == '') {
            var productsrt = sessionStorage.getItem("srcproduct");
            sessionStorage.removeItem("srcproduct");
        } else {
            var productsrt = form.src.value
        }

        const washingtonRef = doc(db, "products", idp);
        await updateDoc(washingtonRef, {
            src: productsrt,
            name: form.name.value,
            price: form.price.value,
            detail: form.detail.value,
        })
        //อย่าลืม remove ค่าที่ไม่ใช้แล้ว
        sessionStorage.removeItem("favoriteMovie");

        window.location.href = "product.html";
    })
}

try {
    const products = collection(db, "products");
    const q = query(products, where("idp", "==", idp));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderProduct(doc);
        // console.log(doc.data().name);
    })
} catch (error) {
    throw error
}

const show = document.getElementById('show');
show.src = form.src.value

const src = document.getElementById('src');
src.addEventListener('input', (e) => {
    show.src = e.target.value
})