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
var idu = sessionStorage.getItem("idu");
console.log('idu', idu);
var lis1 = sessionStorage.getItem("lis1");
lis1 = lis1.split(',');
console.log('lis1', lis1);

const row = document.getElementById('row');
const lisp = [];
const ppayment = document.getElementById('p-payment')


//tranform number to number with comma
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

//read product
function renderProduct(product) {

    let card = document.createElement('div');
    let src = document.createElement('img');
    let cardbody = document.createElement('div');
    let h5 = document.createElement('h5');
    let price = document.createElement('h5');
    let row1 = document.createElement('div');
    let col1 = document.createElement('div');
    let col2 = document.createElement('div');
    let i = document.createElement('i');

    let p1 = document.createElement('p');
    let p2 = document.createElement('p');

    card.setAttribute('data-id', product.id);
    cardbody.setAttribute('databody-id', product.id);
    card.setAttribute('style', 'width: 100rem;');
    src.setAttribute('src', product.data().src);

    row1.className = 'row';
    col1.className = 'col-4';
    col2.className = 'col-8';


    card.className = "card";
    src.className = "card-img-top";
    cardbody.className = "card-body";
    h5.className = "card-title";
    price.className = "card-price";
    i.className = "fas fa-trash-alt";

    h5.innerText = product.data().name;
    price.innerText = numberWithCommas(product.data().price);

    cardbody.appendChild(h5);
    cardbody.appendChild(price);
    cardbody.appendChild(i);


    col1.appendChild(src)
    col2.appendChild(cardbody)

    row1.appendChild(col1)
    row1.appendChild(col2)

    // card.appendChild(src)
    // card.appendChild(cardbody)
    card.appendChild(row1)

    row.appendChild(card)
    row.appendChild(p1)
    row.appendChild(p2)
    lisp.push(parseInt(product.data().price))

    //del
    i.addEventListener('click', async (e) => {
        let id = e.target.parentElement.getAttribute('databody-id');
        console.log(id);
        // await deleteDoc(doc(db, "products", id));
        const index = lis1.indexOf(id);
        if (index > -1) {
            lis1.splice(index, 1); // 2nd parameter means remove one item only
        }
        console.log(lis1)
        sessionStorage.setItem("lis1", lis1);

        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis : lis1
        })



    });


}

//read product in basket
for (let i = 0; i < lis1.length; i++) {
    // alert(lis1[i]);
    try {
        const products = collection(db, "products");
        const q = query(products, where('idp', '==', lis1[i]));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            renderProduct(doc);
        })
    } catch (error) {
        throw error
    }
}
const raka = lisp.reduce((a, b) => a + b, 0)
console.log('ราคา', raka)
ppayment.innerText = `ยอดรวม ${numberWithCommas(raka)} บาท`
sessionStorage.setItem("raka", raka);