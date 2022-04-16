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

const upload = document.getElementById('upload')
const file = document.getElementById('file')
const profile = document.getElementById('profile')
const comment = document.getElementById('comment')
const send = document.getElementById('send')

var lis1 = sessionStorage.getItem("lis1");
// console.log('lis3', (lis3))
lis1 = lis1.split(',');
console.log('lis1', lis1)

const qty_auto = document.getElementById('qty_auto');
if (lis1.length - 1 > 0) {
    qty_auto.innerText = `${lis1.length - 1}`
    qty_auto.style.display = 'block'
}

comment.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        comment.value = ''
      }
})

upload.addEventListener('click', async (e) => {
    file.click()
})

file.addEventListener('input', async (e) => {
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        // console.log(reader.result)
        // const lll = reader.result;
        const src = reader.result
        profile.src = src
        // slip.style.display = 'block'

    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        console.log('pear')
    }
})

var ida = sessionStorage.getItem("ida");
console.log('ida', ida);
if (ida != 'admin') {
    document.getElementById('approveid').style.display = 'none'
}
const out = document.getElementById('out')
out.addEventListener('click', async (e) => {
    sessionStorage.removeItem("idu");
    sessionStorage.removeItem("ida");
    sessionStorage.removeItem("lis1");
    sessionStorage.removeItem("lis2");
    sessionStorage.removeItem("ida");
    window.location.href = "signin.html";
})