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
const ul = document.getElementById('ul');

//read
function renderHistory(his) {

    //create form

    const form = document.createElement('form');

    // logistic
    const rowl = document.createElement('div');
    const col1l = document.createElement('div');
    const col2l = document.createElement('div');

    rowl.className = 'row'
    col1l.className = 'col-4'
    col2l.className = 'col-8'
    const group1 = document.createElement('div');
    group1.className = 'form-group';

    const label1 = document.createElement('label');
    label1.innerText = 'เลือกขนส่ง'

    const select1 = document.createElement('select');
    select1.className = 'form-control';
    select1.setAttribute('name', 'logis');
    select1.setAttribute('style', 'width:125px;');

    const op11 = document.createElement('option');
    op11.innerText = 'เลือกขนส่ง';
    const op12 = document.createElement('option');
    op12.innerText = 'Kerry';
    const op13 = document.createElement('option');
    op13.innerText = 'Flash'

    select1.appendChild(op11);
    select1.appendChild(op12);
    select1.appendChild(op13);

    const label2 = document.createElement('label');
    label2.innerText = 'กรอกรหัสขนส่ง'

    const logisv = document.createElement('input');
    logisv.setAttribute('type', 'text');
    logisv.setAttribute('name', 'logisv');
    logisv.className = 'form-control'

    col1l.appendChild(label1);
    col1l.appendChild(select1);

    col2l.appendChild(label2);
    col2l.appendChild(logisv);

    rowl.appendChild(col1l)
    rowl.appendChild(col2l)

    group1.appendChild(rowl)
    // logistic

    // อนุมัติ
    const rowa = document.createElement('div');
    const col1a = document.createElement('div');
    const col2a = document.createElement('div');

    rowa.className = 'row'
    col1a.className = 'col-4'
    col2a.className = 'col-8'
    const group2 = document.createElement('div');
    group2.className = 'form-group';

    const labela1 = document.createElement('label');
    labela1.innerText = 'การอนุมัติ'

    const selecta1 = document.createElement('select');
    selecta1.className = 'form-control';
    selecta1.setAttribute('name', 'approve');
    selecta1.setAttribute('style', 'width:125px;');

    const opa1 = document.createElement('option');
    opa1.innerText = 'รอการอนุมัติ';
    opa1.setAttribute('value','wait')
    const opa2 = document.createElement('option');
    opa2.innerText = 'ผ่าน';
    const opa3 = document.createElement('option');
    opa3.innerText = 'ไม่ผ่าน'

    selecta1.appendChild(opa1);
    selecta1.appendChild(opa2);
    selecta1.appendChild(opa3);

    const labela2 = document.createElement('label');
    labela2.innerText = 'หมายเหตุ'

    const approvev = document.createElement('input');
    approvev.setAttribute('type', 'text');
    approvev.setAttribute('name', 'approvev');
    approvev.className = 'form-control'

    col1a.appendChild(labela1);
    col1a.appendChild(selecta1);

    col2a.appendChild(labela2);
    col2a.appendChild(approvev);

    rowa.appendChild(col1a)
    rowa.appendChild(col2a)

    group2.appendChild(rowa)
    // อนุมัติ

    // btn
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary'
    btn.setAttribute('type', 'submit')
    btn.innerText = 'submit'
    // btn

    // appenchild to form
    form.appendChild(group1)
    form.appendChild(group2)
    form.appendChild(btn)
    // appenchild to form

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let idh = e.target.parentElement.getAttribute('data-id');
        // console.log(form.dataid)
        console.log('idh', idh)
        console.log(`เลือกขนส่ง : ${form.logis.value}`)
        console.log('logisv', form.logisv.value)

        console.log('รอการอนุมัติ', form.approve.value)
        console.log('approvev', form.approvev.value)

        const washingtonRef = doc(db, "history", idh);
        await updateDoc(washingtonRef, {
            logis : form.logis.value,
            logisv : form.logisv.value,
            status : form.approve.value,
            approvev : form.approvev.value
        })
        location.reload();
    })





    const row = document.createElement('div');
    const col1 = document.createElement('div');
    const col2 = document.createElement('div');

    const li = document.createElement('li');
    const name = document.createElement('p');
    const total = document.createElement('p');
    const slip = document.createElement('img');
    const hr = document.createElement('hr');
    const phone = document.createElement('p')
    const address = document.createElement('p');

    li.setAttribute('data-id', his.id);
    slip.setAttribute('style', "max-width: 220px;");
    slip.setAttribute('src', his.data().src);
    col2.setAttribute('data-id', his.id)

    row.className = 'row';
    col1.className = 'col-5';
    col2.className = 'col-7';


    name.innerText = `ชื่อ ${his.data().name}`;
    total.innerText = `ยอดรวม ${his.data().total}`
    address.innerText = his.data().address;
    phone.innerText = `เบอร์โทรศัพท์ ${his.data().phone}`



    li.appendChild(name);
    li.appendChild(total);
    col1.appendChild(slip);

    col2.appendChild(phone);
    col2.appendChild(address);
    col2.appendChild(form);


    row.appendChild(col1);
    row.appendChild(col2);

    li.appendChild(row);
    li.appendChild(hr);


    ul.appendChild(li);

}




// read
try {
    const history = collection(db, "history");
    const q = query(history, where('status', '==', 'wait'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
        renderHistory(doc);
    })
} catch (error) {
    throw error
}