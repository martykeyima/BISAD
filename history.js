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

const tbody = document.getElementById('tbody');


function renderHistory(his) {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');

    th.innerText = his.data().name;

    const occurrences = his.data().productlis.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});

    // console.log(occurrences) // => {2: 5, 4: 1, 5: 3, 9: 1}

    for (const property in occurrences) {
        // console.log(`${property}: ${occurrences[property]}`);
        // property = src
        // ${occurrences[property]} = จำนวน
        
    }

    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tbody.appendChild(tr);
}


// read
try {
    const history = collection(db, "history");
    const q = query(history);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderHistory(doc);
    })  
} catch (error) {
    throw error
}

