import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, query, getDocs, doc, setDoc, addDoc, deleteDoc, where, orderBy, onSnapshot, updateDoc, arrayUnion } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

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

const pdiv = document.getElementById("row");
const addp = document.getElementById('addp');

//tranform number to number with comma
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


//อ่านสินค้าที่ user ใส่ตระกร้า
const users = collection(db, "users");
const q = query(users, where('idu', '==', idu));
const querySnapshot = await getDocs(q);
querySnapshot.forEach(doc => {
    const lis2 = doc.data().productlis
    console.log(lis2)
    sessionStorage.setItem("lis2", lis2);
    // เมื่อชำระเงินแล้วอย่าลืมมารีเซ็ต

})

var lis3 = sessionStorage.getItem("lis2");
console.log('lis3', (lis3))
const lis1 = lis3.split(',');
console.log('lis1',lis1)


function renderProduct(product) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let dib = document.createElement('div');
    let h5 = document.createElement('h5');
    let del = document.createElement('div');
    let span = document.createElement('span');
    let i = document.createElement("i");
    let buy = document.createElement('button');
    let basket = document.createElement('button');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let col = document.createElement('div');


    div.setAttribute("data-id", product.id);
    dib.setAttribute("databody-id", product.id);

    div.className = "card";
    img.className = "card-img-top";
    dib.className = "card-body";
    h5.className = "card-title";
    del.className = "del";
    span.className = "price_span";
    i.className = "fas fa-pencil-alt";
    buy.className = "btn buy";
    basket.className = "btn basket";
    col.className = 'col-4'

    h5.innerText = product.data().name;
    del.innerText = "X";
    // const x = numberWithCommas(product.data().price);
    span.innerText = `Price ${numberWithCommas(product.data().price)}`;
    buy.innerText = "buy";
    basket.innerText = "basket";

    div.setAttribute("style", "width: 19rem;");
    img.setAttribute("src", product.data().src);



    dib.appendChild(h5);
    dib.appendChild(buy);
    dib.appendChild(basket);
    dib.appendChild(p1);
    dib.appendChild(p2);

    div.appendChild(img);
    div.appendChild(dib);
    div.appendChild(del);
    div.appendChild(span);
    div.appendChild(i);
    div.appendChild(p1);
    // div.appendChild(p2);

    col.appendChild(div);
    col.appendChild(p1)

    pdiv.appendChild(col);
    // pdiv.appendChild(document.createElement('br'));
    // pdiv.appendChild(p2);


    //del
    del.addEventListener('click', async (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(id);
        await deleteDoc(doc(db, "products", id));

    });

    //update
    i.addEventListener('click', async (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        sessionStorage.setItem("favoriteMovie", id);

        window.location.href = "updateP.html";

    });

    //basket
    basket.addEventListener('click', async (e) => {
        e.preventDefault();
        let id = e.target.parentElement.getAttribute('databody-id');
        lis1.push(id);
        console.log(lis1);
    })

    //buy
    buy.addEventListener('click', async (e) => {
        e.preventDefault();
        let id = e.target.parentElement.getAttribute('databody-id');
        lis1.push(id);
        console.log('lis1', lis1)
        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis: lis1
        })
        sessionStorage.setItem("lis1", lis1);
        window.location.href = "basket.html";
    })

    //if admin
    if (idu != '5vzP4VuX6LxmWeF5zBlY') {
        del.setAttribute('style', 'display:none;');
        i.setAttribute('style', 'display:none;');
        addp.setAttribute('style', 'display:none;');
    }
}

// read
try {
    const products = collection(db, "products");
    const q = query(products);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderProduct(doc);
    })
} catch (error) {
    throw error
}

// password
const formp = document.getElementById("password");
try {
    formp.addEventListener('submit', async (e) => {
        e.preventDefault();
        const ppp = formp.password.value;
        if (ppp == "commy") {
            window.location.href = "addP.html";
        }
        else {
            alert("wrong password")
        }
        formp.password.value = "";
    });
} catch (error) {
    throw error
}
