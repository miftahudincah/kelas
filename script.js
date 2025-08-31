/* === FIREBASE CONFIG === */
const firebaseConfig = {
  apiKey: "ISI_API_KEY",
  authDomain: "esp32-3a6dd.firebaseapp.com",
  databaseURL: "https://esp32-3a6dd-default-rtdb.firebaseio.com/",
  projectId: "esp32-3a6dd",
  storageBucket: "esp32-3a6dd.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* === GLOBAL VARIABLES === */
let currentUser = null, currentToken = null, isAdmin = false, currentUserId = null;
let currentUserData = null, panelRef = null;
let voltageChart = null, ampereChart = null;
let voltageData = [], voltageLabels = [], ampereData = [], ampereLabels = [];

/* === DARK MODE TOGGLE === */
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

/* === PAGE SWITCH === */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id === "examPage") loadExam();
}

/* === REGISTER USER === */
function registerUser() {
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPassword').value.trim();
  const token = document.getElementById('regToken').value.trim();
  const ibu = document.getElementById('regIbu').value.trim();
  const role = "user"; // default user
  if (!email || !pass || !token || !ibu) return alert("Lengkapi semua data!");

  const userId = email.replace(/\W/g, "_");

  db.ref("users/" + userId).get().then(userSnap => {
    if (userSnap.exists()) return alert("Email sudah terpakai!");

    db.ref("panel/" + token).get().then(panelSnap => {
      if (!panelSnap.exists()) return alert("❌ Token tidak valid!");

      db.ref("users/" + userId).set({
        email, password: pass, token, ibu,
        isAdmin: role === "admin", online: false, photoURL: "", lastLogin: null, lastSeen: null
      });
      alert("✅ Registrasi berhasil."); 
      showPage("loginPage");
    });
  });
}

/* === LOGIN USER === */
function loginUser() {
  const email = document.getElementById("logEmail").value.trim();
  const pass = document.getElementById("logPassword").value.trim();
  if (!email || !pass) return alert("Isi email dan password!");

  const userId = email.replace(/\W/g, "_");
  db.ref("users/" + userId).get().then(snap => {
    if (!snap.exists()) return alert("❌ User tidak ditemukan!");
    const data = snap.val();
    if (data.password !== pass) return alert("❌ Password salah!");

    currentUser = email;
    currentToken = data.token;
    isAdmin = data.isAdmin || false;
    currentUserId = userId;
    currentUserData = data;

    setUserOnline(userId);
    updateLastSeenPeriodically(userId);

    localStorage.setItem("currentUser", email);
    localStorage.setItem("currentToken", currentToken);
    localStorage.setItem("isAdmin", isAdmin);

    showPage("panelPage");
    initPanel(currentToken);
  });
}

/* === SET USER ONLINE & LAST LOGIN / LAST SEEN === */
function setUserOnline(userId) {
  if (!userId) return;
  const userRef = db.ref("users/" + userId);
  const now = Date.now();

  userRef.update({ online: true, lastLogin: now });

  window.addEventListener("beforeunload", () => {
    userRef.update({ online: false, lastSeen: Date.now() });
  });

  const connectedRef = db.ref(".info/connected");
  connectedRef.on("value", snap => {
    if (snap.val() === true) {
      userRef.onDisconnect().update({ online: false, lastSeen: Date.now() });
      userRef.update({ online: true });
    }
  });
}

function updateLastSeenPeriodically(userId) {
  if (!userId) return;
  setInterval(() => {
    db.ref("users/" + userId).update({ lastSeen: Date.now() });
  }, 60000);
}

/* === LOGOUT === */
function logout() {
  if (currentUserId) db.ref("users/" + currentUserId).update({ online: false });
  currentUser = null; currentToken = null; isAdmin = false; currentUserId = null;
  currentUserData = null;
  if (voltageChart) voltageChart.destroy(); voltageChart = null;
  if (ampereChart) ampereChart.destroy(); ampereChart = null;
  panelRef = null;
  localStorage.clear();
  showPage("loginPage");
}

/* === PANEL INIT === */
function initPanel(token) {
  panelRef = db.ref("panel/" + token);
  document.getElementById("btnOn").style.display = isAdmin ? "inline-block" : "none";
  document.getElementById("btnOff").style.display = isAdmin ? "inline-block" : "none";

  panelRef.on("value", snap => {
    const data = snap.val(); if (!data) return;
    document.getElementById("voltageVal").innerText = data.voltage || 0;
    document.getElementById("ampereVal").innerText = data.ampere || 0;
    document.getElementById("panelInfo").innerText = "Status: " + (data.status || "OFF");

    const now = new Date().toLocaleTimeString();
    voltageData.push(data.voltage || 0); voltageLabels.push(now);
    ampereData.push(data.ampere || 0); ampereLabels.push(now);
    if (voltageData.length > 20) { voltageData.shift(); voltageLabels.shift(); }
    if (ampereData.length > 20) { ampereData.shift(); ampereLabels.shift(); }

    updateCharts();
  });

  // Daftar user dengan token sama
  const userListDiv = document.getElementById("userList");
  db.ref("users").orderByChild("token").equalTo(token).on("value", snap => {
    userListDiv.innerHTML = "";
    const users = snap.val();
    if (!users) return;

    Object.keys(users).forEach(uid => {
      const u = users[uid];
      const card = document.createElement("div");
      card.className = "card"; card.style.display = "flex"; card.style.alignItems = "center"; card.style.gap = "10px"; card.style.cursor = "pointer";

      const img = document.createElement("img");
      img.src = u.photoURL || "https://via.placeholder.com/40";
      img.style.width = "40px"; img.style.height = "40px"; img.style.borderRadius = "50%"; img.alt = "Foto";

      const span = document.createElement("span");
      span.textContent = u.email + (u.isAdmin ? " (guru)" : "");

      const statusDot = document.createElement("span");
      const lastSeenText = document.createElement("small"); lastSeenText.style.marginLeft = "5px";
      if (u.online) { statusDot.textContent = "●"; statusDot.style.color = "green"; lastSeenText.textContent = "Sedang Online"; }
      else { statusDot.textContent = "○"; statusDot.style.color = "red"; lastSeenText.textContent = u.lastSeen ? "Terakhir: " + new Date(u.lastSeen).toLocaleString("id-ID") : "-"; }
      statusDot.style.marginLeft = "auto";

      card.appendChild(img); card.appendChild(span); card.appendChild(statusDot); card.appendChild(lastSeenText);
      card.addEventListener("click", () => { openUserProfile(uid); });
      userListDiv.appendChild(card);
    });
  });
}

/* === OPEN USER PROFILE === */
function openUserProfile(userId) {
  if (!userId) return;
  db.ref("users/" + userId).get().then(snap => {
    if (!snap.exists()) return;
    const data = snap.val();
    const isOwnProfile = (currentUserId === userId);

    document.getElementById('profileEmail').innerText = data.email || "-";
    document.getElementById('profileToken').innerText = data.token || "-";
    document.getElementById('profileIbu').innerText = isOwnProfile ? (data.ibu || "-") : "●●●";
    document.getElementById('photoPreview').src = data.photoURL || "https://via.placeholder.com/120";

    const statusEl = document.getElementById("profileStatus");
    const lastEl = document.getElementById("profileLastLogin");
    if (data.online) {
      statusEl.innerText = "Online"; statusEl.className = "online";
      lastEl.innerText = "Sedang Online";
    } else {
      statusEl.innerText = "Offline"; statusEl.className = "offline";
      lastEl.innerText = data.lastSeen ? "Terakhir dilihat: " + new Date(data.lastSeen).toLocaleString("id-ID") : "-";
    }

    if (isOwnProfile) {
      document.getElementById("photoInput").style.display = "block";
      document.querySelector('#profilePage button.btn-primary').style.display = "block";
    } else {
      document.getElementById("photoInput").style.display = "none";
      document.querySelector('#profilePage button.btn-primary').style.display = "none";
    }

    showPage("profilePage");
  });
}

/* === UPLOAD FOTO PROFIL === */
function uploadProfilePhoto(file) {
  if (!currentUserId || !file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const base64String = e.target.result;
    db.ref("users/" + currentUserId).update({ photoURL: base64String });
    document.getElementById("photoPreview").src = base64String;
    alert("✅ Foto profil berhasil diperbarui!");
  };
  reader.readAsDataURL(file);
}

/* === EVENT LISTENER INPUT FOTO === */
window.addEventListener("load", () => {
  const photoInput = document.getElementById("photoInput");
  if (photoInput) {
    photoInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) uploadProfilePhoto(file);
    });
  }

  // Tombol panel
  document.getElementById("btnOn")?.addEventListener("click", () => { if(isAdmin) panelRef.update({status:"ON"}); });
  document.getElementById("btnOff")?.addEventListener("click", () => { if(isAdmin) panelRef.update({status:"OFF"}); });
  document.getElementById("btnOpenProfile")?.addEventListener("click", () => { if(currentUserId) openUserProfile(currentUserId); else alert("❌ User belum login!"); });
  document.getElementById("btnExam")?.addEventListener("click", () => { showPage("examPage"); });
  document.getElementById("btnLogout")?.addEventListener("click", logout);

  // Load tema
  if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark-mode");

  // Auto-login jika ada data
  const savedUser = localStorage.getItem("currentUser");
  const savedToken = localStorage.getItem("currentToken");
  const savedAdmin = localStorage.getItem("isAdmin") === "true";
  if(savedUser && savedToken){
    currentUser = savedUser;
    currentToken = savedToken;
    isAdmin = savedAdmin;
    currentUserId = savedUser.replace(/\W/g,"_");

    db.ref("users/" + currentUserId).get().then(snap => {
      if (snap.exists()) currentUserData = snap.val();
    });

    setUserOnline(currentUserId);
    updateLastSeenPeriodically(currentUserId);
    initPanel(currentToken);
    showPage("panelPage");
  } else showPage("loginPage");
});

/* === CHART UPDATE === */
function updateCharts() {
  if (!voltageChart) {
    const ctxV = document.getElementById("voltageChart").getContext("2d");
    voltageChart = new Chart(ctxV, {
      type: "line",
      data: { labels: voltageLabels, datasets: [{ label: "Voltage (V)", data: voltageData, borderColor: "#2575fc", fill: false, tension: 0.3 }] },
      options: { scales: { y: { beginAtZero: true } } }
    });
  } else {
    voltageChart.data.labels = voltageLabels; 
    voltageChart.data.datasets[0].data = voltageData; 
    voltageChart.update();
  }

  if (!ampereChart) {
    const ctxA = document.getElementById("ampereChart").getContext("2d");
    ampereChart = new Chart(ctxA, {
      type: "line",
      data: { labels: ampereLabels, datasets: [{ label: "Ampere (A)", data: ampereData, borderColor: "#6a11cb", fill: false, tension: 0.3 }] },
      options: { scales: { y: { beginAtZero: true } } }
    });
  } else {
    ampereChart.data.labels = ampereLabels; 
    ampereChart.data.datasets[0].data = ampereData; 
    ampereChart.update();
  }
}

/* === EXAM / UJIAN === */
const examRef = db.ref("exams");     // Tempat soal
const answerRef = db.ref("answers"); // Tempat jawaban

/* === LOAD SOAL UNTUK USER ATAU ADMIN === */
function loadExam() {
  const examDiv = document.getElementById("examList");
  examDiv.innerHTML = "";

  examRef.once("value").then(snap => {
    const exams = snap.val();
    if(!exams) return examDiv.innerText = "Belum ada soal.";

    Object.keys(exams).forEach(examId => {
      const ex = exams[examId];
      const card = document.createElement("div");
      card.className = "card examCard";

      const qP = document.createElement("p");
      qP.innerHTML = `<strong>Soal:</strong> ${ex.question}`;
      card.appendChild(qP);

      if(!isAdmin){
        const input = document.createElement("textarea");
        input.placeholder = "Jawaban Anda...";
        input.id = "answer_" + examId;
        card.appendChild(input);

        const btn = document.createElement("button");
        btn.textContent = "Kirim Jawaban";
        btn.className = "btn btn-primary";
        btn.addEventListener("click", () => submitAnswer(examId));
        card.appendChild(btn);
      }

      examDiv.appendChild(card);
    });
  });
}

/* === USER: KIRIM JAWABAN === */
function submitAnswer(examId) {
  const textarea = document.getElementById("answer_" + examId);
  if(!textarea) return;
  const answerText = textarea.value.trim();
  if(!answerText) return alert("Jawaban kosong!");

  const ansId = "ans_" + Date.now() + "_" + currentUserId;
  answerRef.child(ansId).set({
    userId: currentUserId,
    examId: examId,
    answer: answerText,
    timestamp: Date.now()
  }).then(() => {
    alert("✅ Jawaban berhasil dikirim!");
    textarea.value = "";
  });
}

/* === ADMIN: BUAT SOAL === */
function createExam() {
  if(!isAdmin) return alert("Hanya admin bisa membuat soal!");
  const question = prompt("Masukkan soal baru:");
  if(!question) return;
  const examId = "exam_" + Date.now();
  examRef.child(examId).set({
    question: question,
    createdAt: Date.now()
  }).then(() => {
    alert("✅ Soal berhasil dibuat!");
    loadExam();
  });
}

/* === ADMIN: LIHAT JAWABAN USER === */
function loadAnswers() {
  if(!isAdmin) return;
  const answerDiv = document.getElementById("answerList");
  answerDiv.innerHTML = "";

  answerRef.once("value").then(snap => {
    const answers = snap.val();
    if(!answers) return answerDiv.innerText = "Belum ada jawaban.";

    Object.keys(answers).forEach(ansId => {
      const a = answers[ansId];
      examRef.child(a.examId).get().then(qSnap => {
        const questionText = qSnap.exists() ? qSnap.val().question : "Soal sudah dihapus";

        const aDiv = document.createElement("div");
        aDiv.className = "adminAnswer";

        aDiv.innerHTML = `
          <span>User: <strong>${a.userId}</strong></span>
          <p><strong>Soal:</strong> ${questionText}</p>
          <p><strong>Jawaban:</strong> ${a.answer}</p>
          <p><small>Waktu: ${new Date(a.timestamp).toLocaleString("id-ID")}</small></p>
        `;

        answerDiv.appendChild(aDiv);
      });
    });
  });
}

/* === EVENT ADMIN === */
document.getElementById("btnCreateExam")?.addEventListener("click", () => {
  createExam();
  loadExam();
});

/* === LOAD DATA SAAT HALAMAN SIAP === */
if(isAdmin){
  window.addEventListener("load", () => {
    loadAnswers();
    loadExam();
  });
} else {
  window.addEventListener("load", loadExam);
}