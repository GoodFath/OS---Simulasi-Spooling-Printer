const addBtn = document.getElementById('addBtn');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const queueList = document.getElementById('queueList');
const printerStatus = document.getElementById('printerStatus');
const logBox = document.getElementById('logBox');

let queue = [];
let printing = false;
let paused = false;
let docCount = 0;

function log(msg) {
    const time = new Date().toLocaleTimeString();
    logBox.innerHTML += `[${time}] ${msg}<br>`;
    logBox.scrollTop = logBox.scrollHeight;
}

addBtn.onclick = () => {
    docCount++;
    const doc = { id: docCount, status: 'waiting' };
    queue.push(doc);
    updateQueue();
    log(`Dokumen ${doc.id} ditambahkan ke antrian.`);
};

startBtn.onclick = async () => {
    if (printing) return;
    printing = true;
    paused = false;
    log('Simulasi Printer dimulai.');

while (queue.length > 0 && printing) {
    const doc = queue[0];
    if (paused) {
        await new Promise(r => setTimeout(r, 200));
        continue;
    }

    doc.status = 'printing';
    updateQueue();
    printerStatus.textContent = `Status Printer: 🔴 Busy = Mencetak Dokumen ${doc.id}`;
    log(`Mulai mencetak Dokumen ${doc.id}...`);
    await new Promise(r => setTimeout(r, 3000)); //timer simulasi cetak, hanya berdurasi 3 detik
    doc.status = 'done';
    updateQueue();
    log(`Dokumen ${doc.id} selesai dicetak.`);
    queue.shift();
}

    printerStatus.textContent = `Status Printer: 🟢 Idle`;
    printing = false;
    log('Simulasi Printer sedang dalam mode idle. Silakan melakukan reset atau tambahkan dokumen baru untuk melanjutkan simulasi.');
};

pauseBtn.onclick = () => {
    paused = !paused;
    log(paused ? 'Printer dijeda. Silakan klik tombol jeda lagi untuk melanjutkan.' : 'Simulasi Printer dilanjutkan.');
};

resetBtn.onclick = () => {
    queue = [];
    docCount = 0;
    printing = false;
    paused = false;
    queueList.innerHTML = '';
    printerStatus.textContent = 'Status Printer: 🟢 Idle';
    log('Simulasi direset.');
};

function updateQueue() {
    queueList.innerHTML = '';
    queue.forEach(doc => {
        const div = document.createElement('div');
        div.textContent = `Dokumen ${doc.id}`;
        div.classList.add('doc', doc.status);
        queueList.appendChild(div);
    });
}