import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, query, getDocs, doc, setDoc, addDoc, deleteDoc, where, orderBy, onSnapshot, updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';


// https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
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

const qty = document.getElementById('qty');
const minus = document.getElementById('minus');
const plus = document.getElementById('plus');

const img = document.getElementById('img')
const title = document.getElementById('title')
const price = document.getElementById('price')
const detail = document.getElementById('detail')

const buy = document.getElementById('buy');
const cart = document.getElementById('cart');

var idu = sessionStorage.getItem("idu");
console.log('idu', idu);

var idp = sessionStorage.getItem("idp");
console.log('idp', idp);

var ida = sessionStorage.getItem("ida");
console.log('ida', ida);
if (ida != 'admin') {
    document.getElementById('approveid').style.display = 'none'
}

var lis1 = sessionStorage.getItem("lis1");
console.log('lis1', lis1);
lis1 = lis1.split(',');
console.log('lis1', lis1)

const qty_auto = document.getElementById('qty_auto');
if (lis1.length - 1 > 0) {
    qty_auto.innerText = `${lis1.length - 1}`
    qty_auto.style.display = 'block'
}

//tranform number to number with comma
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


plus.addEventListener('click', async (e) => {
    e.preventDefault();
    // let id = e.target.parentElement.getAttribute('databody-id');
    qty.value = parseInt(qty.value) + 1
    minus.setAttribute('style', 'cursor: pointer;')

})

minus.addEventListener('click', async (e) => {
    e.preventDefault();
    // let id = e.target.parentElement.getAttribute('databody-id');
    if (parseInt(qty.value) - 1 < 1) {
        qty.value = 1
    } else {
        qty.value = parseInt(qty.value) - 1
    }

    if (qty.value == 1) {
        minus.setAttribute('style', 'cursor: not-allowed;')
    }

})

function renderProduct(product) {

    img.src = product.data().src
    title.innerText = product.data().name
    price.innerText = `฿${numberWithCommas(product.data().price)}`
    detail.innerText = product.data().detail

    cart.addEventListener('click', async (e) => {
        console.log(qty.value)
        for (let i = 0; i < parseInt(qty.value); i++) {
            lis1.push(idp)
            console.log('lis1', lis1)

        }
        sessionStorage.setItem("lis1", lis1);
        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis: lis1
        })
        window.location.href = "product.html"

    });

    buy.addEventListener('click', async (e) => {
        console.log(qty.value)
        for (let i = 0; i < parseInt(qty.value); i++) {
            lis1.push(idp)
            console.log('lis1', lis1)

        }
        sessionStorage.setItem("lis1", lis1);
        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis: lis1
        })
        window.location.href = "basket.html"
    });


}


// read
try {
    const products = collection(db, "products");
    const q = query(products, where('idp', '==', idp));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderProduct(doc);
    })
} catch (error) {
    throw error
}

const out = document.getElementById('out')
out.addEventListener('click', async (e) => {
    sessionStorage.removeItem("idu");
    sessionStorage.removeItem("ida");
    sessionStorage.removeItem("lis1");
    sessionStorage.removeItem("lis2");
    window.location.href = "index.html";
})