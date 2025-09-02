/* === REGISTER USER === */
function registerUser() {
  const email = document.getElementById('regEmail').value.trim();
  const pass = document.getElementById('regPassword').value.trim();
  const token = document.getElementById('regToken').value.trim();
  const ibu = document.getElementById('regIbu').value.trim();
  const role = document.getElementById('regRole')?.value || "user"; // ⬅️ bisa pilih admin/user
  if (!email || !pass || !token || !ibu) return alert("Lengkapi semua data!");

  const userId = email.replace(/\W/g, "_");

  db.ref("users/" + userId).get().then(userSnap => {
    if (userSnap.exists()) return alert("Email sudah terpakai!");

    db.ref("panel/" + token).get().then(panelSnap => {
      if (!panelSnap.exists()) return alert("❌ Token tidak valid!");

      db.ref("users/" + userId).set({
        email,
        password: pass,
        token,
        ibu,
        isAdmin: role === "admin",
        allowed: role === "admin" ? true : false,  // ⬅️ admin langsung aktif
        online: false,
        photoURL: "",
        lastLogin: null,
        lastSeen: null
      });

      if (role === "admin") {
        alert("✅ Registrasi berhasil sebagai ADMIN.");
      } else {
        alert("✅ Registrasi berhasil.\n❗ Tunggu admin mengizinkan akun Anda.");
      }
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

    // User biasa harus menunggu izin admin
    if (!data.isAdmin && !data.allowed) {
      return alert("❌ Akun Anda belum diizinkan admin!");
    }

    // simpan data session
    currentUser = email;
    currentToken = data.token;
    isAdmin = data.isAdmin || false;
    currentUserId = userId;
    currentUserData = data;

    localStorage.setItem("currentUser", email);
    localStorage.setItem("currentToken", currentToken);
    localStorage.setItem("isAdmin", isAdmin);

    setUserOnline(userId);
    updateLastSeenPeriodically(userId);

    showPage("panelPage");
    initPanel(currentToken);
  });
}

/* === AUTO LOGIN JIKA ADA DATA DI LOCALSTORAGE === */
window.addEventListener("load", () => {
  const savedUser = localStorage.getItem("currentUser");
  const savedToken = localStorage.getItem("currentToken");
  const savedAdmin = localStorage.getItem("isAdmin") === "true";

  if (savedUser && savedToken) {
    currentUser = savedUser;
    currentToken = savedToken;
    isAdmin = savedAdmin;
    currentUserId = savedUser.replace(/\W/g, "_");

    db.ref("users/" + currentUserId).get().then(snap => {
      if (snap.exists()) {
        currentUserData = snap.val();

        // cek izin hanya untuk user biasa
        if (!currentUserData.isAdmin && !currentUserData.allowed) {
          alert("❌ Akun Anda belum diizinkan admin!");
          logout();
          return;
        }
      }
    });

    setUserOnline(currentUserId);
    updateLastSeenPeriodically(currentUserId);

    showPage("panelPage");
    initPanel(currentToken);
  } else {
    showPage("loginPage");
  }
});

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
  currentUser = null;
  currentToken = null;
  isAdmin = false;
  currentUserId = null;
  currentUserData = null;

  if (voltageChart) voltageChart.destroy(); voltageChart = null;
  if (ampereChart) ampereChart.destroy(); ampereChart = null;
  panelRef = null;

  localStorage.clear();
  showPage("loginPage");
}
