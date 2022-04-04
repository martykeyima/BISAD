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
var idu = sessionStorage.getItem("idu");
console.log('idu', idu);


let form = document.getElementById("addP")

// render Product
function renderProduct(product) {
    const idp = product.id
    const washingtonRef = doc(db, "products", idp);
    updateDoc(washingtonRef, {
        idp: idp
    })
}

// add
try {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // let com = document.getElementById("name").value;
        const namep = form.name.value;

        await addDoc(collection(db, "products"), {
            src: form.src.value,
            name: form.name.value,
            price: form.price.value,
            detail: form.detail.value
        })
        form.src.value = ""; //reset to null
        form.name.value = ""; //reset to null
        form.price.value = ""; //reset to null
        form.detail.value = ""; //reset to null

        const users = collection(db, "products");
        const q = query(users, where("name", '==', namep));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const n = renderProduct(doc);
        })
    });
} catch (error) {
    throw error
}

// read
// call read