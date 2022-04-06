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
const form = document.getElementById('payment');
const pprice = document.getElementById('p-price');
var idu = sessionStorage.getItem("idu");
console.log('idu', idu);

var raka = sessionStorage.getItem("raka");
console.log('raka', raka);

var lis1 = sessionStorage.getItem("lis1");
lis1 = lis1.split(',');
console.log('lis1', lis1);

//tranform number to number with comma
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
    return x;
}

pprice.innerText = `ยอดรวม ${numberWithCommas(raka)}`

function renderUser(user) {
    form.name.value = user.data().name;
    form.address.value = user.data().address;
    form.phone.value = user.data().phone;
    form.name.value = user.data().name;

    // update ข้อมูลใหม่เมื่อกด ชำระเงิน
    form.addEventListener('submit', async (e) => {
        e.preventDefault()
        var src = sessionStorage.getItem("src");
        // console.log('src', src);


        // add history
        await addDoc(collection(db, "history"), {
            idu: idu,
            name: form.name.value,
            address: form.address.value,
            phone: form.phone.value,
            slip: form.slip.value,
            src: src,
            total : raka
        })

        lis1 = []
        src = ''
        sessionStorage.setItem("lis1", lis1);
        console.log('src', src);
        console.log('lis1', lis1)

        //update basket
        const washingtonRef = doc(db, "users", idu);
        await updateDoc(washingtonRef, {
            productlis : null
        })
    })


}


// read
try {
    const users = collection(db, "users");
    const q = query(users, where('idu', '==', idu));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderUser(doc);
    })
} catch (error) {
    throw error
}



// $('input[type=file]').change(function () {
//     console.dir(this.files[0])
// })

