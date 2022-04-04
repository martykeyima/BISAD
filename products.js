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
console.log('idu',idu);

const pdiv = document.getElementById("row");
const addp = document.getElementById('addp');
const lis = [];


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
    let p = document.createElement('p');


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

    h5.innerText = product.data().name;
    del.innerText = "X";
    span.innerText = `Price ${product.data().price}`;
    buy.innerText = "buy";
    basket.innerText = "basket";

    div.setAttribute("style", "width: 19rem;");
    img.setAttribute("src", product.data().src);



    dib.appendChild(h5);
    dib.appendChild(buy);
    dib.appendChild(basket);
    dib.appendChild(p);

    div.appendChild(img);
    div.appendChild(dib);
    div.appendChild(del);
    div.appendChild(span);
    div.appendChild(i);

    pdiv.appendChild(div);


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
        lis.push(id);
        console.log(lis);
    })

    //buy
    buy.addEventListener('click', async (e) => {
        e.preventDefault();
        let id = e.target.parentElement.getAttribute('databody-id');
        lis.push(id);
        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis : lis
        })
        window.location.href = "basket.html";
    })

    //if admin
    if (idu != 'jZqjU5vQ8QeJzhYEPjEC') {
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

