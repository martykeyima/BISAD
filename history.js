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

const parent = document.getElementById('container');

//tranform number to number with comma
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}


function renderHistory(his) {
    const row1 = document.createElement('div');
    row1.setAttribute('class', 'row card');

    const date = document.createElement('div')
    const datetext = document.createElement('p');
    const hr = document.createElement('hr');
    const dateObject = new Date(his.data().milliseconds)
    const day = dateObject.toLocaleString("th-TH", { day: "numeric" })
    const month = dateObject.toLocaleString("th-TH", { month: "long" })
    const year = dateObject.toLocaleString("th-TH", { year: "numeric" })
    datetext.innerText = `ชำระเงินวันที่ ${day} ${month} ${year}   `
    date.appendChild(datetext);
    date.appendChild(hr)
    row1.appendChild(date)
    console.log(typeof (dateObject.toLocaleString()))

    const productid = his.data().productlis;
    const productsrc = his.data().productsrc;
    const productname = his.data().productname;
    const productprice = his.data().productprice;
    const lis = [];

    for (let i = 0; i < productsrc.length; i++) {
        if (lis.includes(productsrc[i])) {
            console.log("pass")
        }
        else {
            lis.push(productsrc[i])

            const row = document.createElement('div');
            const col1 = document.createElement('div');
            const col2 = document.createElement('div');
            const col3 = document.createElement('div');
            const col4 = document.createElement('div');
            const col5 = document.createElement('div');

            row.className = 'row'
            col1.className = 'col'
            col2.className = 'col'
            col3.className = 'col'
            col4.className = 'col'
            col5.className = 'col'

            const img = document.createElement('img');
            img.className = 'detail'
            img.setAttribute('src', productsrc[i]);
            img.setAttribute('style', 'width:200px;');

            const name = document.createElement('p');
            name.className = 'detail'
            name.setAttribute('style', 'margin-top: 40px;')
            name.innerText = productname[i];

            const price = document.createElement('p')
            price.setAttribute('style', 'margin-top: 40px;')
            price.innerText = `รวม ฿${numberWithCommas(productprice[i])}`;

            const qty = document.createElement('p');
            qty.setAttribute('style', 'margin-top: 40px;')

            //count value
            const counts = {};
            for (const num of productsrc) {
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            }
            //count value
            qty.innerText = `QTY: ${counts[productsrc[i]]}`

            const status = document.createElement('p');
            status.innerText = ''

            col1.appendChild(img)
            col1.setAttribute('data-id', productid[i + 1]);
            col2.appendChild(name)
            col2.setAttribute('data-id', productid[i + 1])
            col3.appendChild(price)
            col4.appendChild(qty)
            col5.appendChild(status)

            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);

            row1.appendChild(row);

            img.addEventListener('click', async (e) => {
                let id = e.target.parentElement.getAttribute('data-id');
                sessionStorage.setItem("idp", id);
                window.location.href = "detail.html";
            })

            name.addEventListener('click', async (e) => {
                let id = e.target.parentElement.getAttribute('data-id');
                sessionStorage.setItem("idp", id);
                window.location.href = "detail.html";
            })
        }

    }
    if (his.data().status == 'wait') {
        const status1 = document.createElement('p');
        status1.className = 'wait2'
        status1.innerText = 'กำลังตรวจสอบสลิปโอนเงิน'
        row1.appendChild(status1)
    } else if (his.data().status == 'ผ่าน') {
        const div1 = document.createElement('div');
        const status1 = document.createElement('p');
        const status2 = document.createElement('p');
        status1.innerText = `ขนส่งโดย: ${his.data().logis}`
        status2.innerText = `รหัสขนส่ง: ${his.data().logisv}`
        status2.setAttribute('style', 'width: 250px;')
        div1.appendChild(status1)
        div1.appendChild(status2)
        div1.className = 'statusdiv'
        row1.appendChild(div1)
    } else {
        const div1 = document.createElement('div');
        const status1 = document.createElement('p');
        const status2 = document.createElement('p');
        status1.innerText = `ไม่ผ่านการอนุมัติ`
        status2.innerText = `${his.data().approvev}`
        div1.appendChild(status1)
        div1.appendChild(status2)
        div1.className = 'statusdiv'
        row1.appendChild(div1);
    }

    parent.appendChild(row1)

}

// read
try {
    const history = collection(db, "history");
    const q = query(history, where('idu', '==', idu), orderBy('milliseconds', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderHistory(doc);
    })
} catch (error) {
    throw error
}