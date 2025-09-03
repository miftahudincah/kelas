/* === PANEL INIT === */
function initPanel(token) {
  if (!token) {
    console.warn("❌ Token panel tidak ditemukan");
    return;
  }

  panelRef = db.ref("panel/" + token);

  // Tampilkan tombol ON/OFF hanya jika admin
  const btnOn = document.getElementById("btnOn");
  const btnOff = document.getElementById("btnOff");
  if (btnOn) btnOn.style.display = isAdmin ? "inline-block" : "none";
  if (btnOff) btnOff.style.display = isAdmin ? "inline-block" : "none";

  // Monitor data panel
  panelRef.on("value", snap => {
    const data = snap.val();
    if (!data) return;

    document.getElementById("voltageVal").innerText = data.voltage || 0;
    document.getElementById("ampereVal").innerText = data.ampere || 0;
    document.getElementById("panelInfo").innerText = "Status: " + (data.status || "OFF");

    const now = new Date().toLocaleTimeString();
    voltageData.push(data.voltage || 0);
    voltageLabels.push(now);
    ampereData.push(data.ampere || 0);
    ampereLabels.push(now);

    if (voltageData.length > 20) {
      voltageData.shift();
      voltageLabels.shift();
    }
    if (ampereData.length > 20) {
      ampereData.shift();
      ampereLabels.shift();
    }

    updateCharts();
  });

  // Daftar user dengan token yang sama
  const userListDiv = document.getElementById("userList");
  db.ref("users").orderByChild("token").equalTo(token).on("value", snap => {
    if (!userListDiv) return;
    userListDiv.innerHTML = "";
    const users = snap.val();
    if (!users) return;

    Object.keys(users).forEach(uid => {
      const u = users[uid];
      const card = document.createElement("div");
      card.className = "card user-item";
      card.setAttribute("data-userid", uid);

      card.innerHTML = `
        <img src="${u.photoURL || "https://via.placeholder.com/40"}" 
             style="width:40px;height:40px;border-radius:50%">
        <span>${u.email || "Tanpa Email"}${u.isAdmin ? " (guru)" : ""}</span>
        <span style="margin-left:auto;color:${u.online ? "green" : "red"}">
          ${u.online ? "●" : "○"}
        </span>
        <small>
          ${
            u.online
              ? "Online"
              : u.lastSeen
              ? "Terakhir: " + new Date(u.lastSeen).toLocaleString("id-ID")
              : "-"
          }
        </small>
        <br>
        <small>Izin: ${u.allowed ? "✅ Diizinkan" : "❌ Belum"}</small>
      `;

      if (isAdmin && !u.isAdmin) {
        const btn = document.createElement("button");
        btn.className = "btn-primary";
        btn.innerText = u.allowed ? "Cabut Izin" : "Izinkan";
        btn.style.marginTop = "5px";
        btn.onclick = (e) => {
          e.stopPropagation();
          db.ref("users/" + uid).update({ allowed: !u.allowed })
            .then(() => alert("✅ Status izin diperbarui!"));
        };
        card.appendChild(btn);
      }

      card.addEventListener("click", () => {
        openUserProfile(uid);
      });

      userListDiv.appendChild(card);
    });
  });

  // Init chat per token
  initChat(token, currentUser, isAdmin ? "admin" : "user");
}

/* === CHAT PANEL === */
let chatRef;
let currentUserEmail = "";
let currentUserRole = "user";

function initChat(token, userEmail, userRole="user") {
  if (!token) return;

  currentUserEmail = userEmail;
  currentUserRole = userRole;

  // Hapus listener lama supaya chat tidak do-bel
  if (chatRef) chatRef.off();
  
  chatRef = db.ref("chats/" + token);
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = ""; // bersihkan chat sebelumnya

  chatRef.on("child_added", snap => {
    const msg = snap.val();
    if (!msg) return;

    // Pastikan pesan belum ada di DOM
    if (document.getElementById("msg-" + snap.key)) return;

    const div = document.createElement("div");
    div.className = "chat-msg";
    div.id = "msg-" + snap.key;

    let deleteBtn = "";
    if (msg.sender === currentUserEmail || currentUserRole === "admin") {
      deleteBtn = `<span class="btn-delete" onclick="deleteMessage('${snap.key}')">[hapus]</span>`;
    }

    div.innerHTML = `
      <strong>${msg.sender}</strong>: 
      <span>${msg.text}</span> ${deleteBtn}
      <br>
      <small style="color:gray">${new Date(msg.timestamp).toLocaleString("id-ID")}</small>
    `;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  document.getElementById("chatAdminTools").style.display = currentUserRole === "admin" ? "block" : "none";
  document.getElementById("btnSend").onclick = sendMessage;
}

function sendMessage() {
  const input = document.getElementById("chatMessage");
  const text = input.value.trim();
  if (!text || !chatRef) return;

  chatRef.push({
    sender: currentUserEmail,
    text: text,
    timestamp: Date.now()
  }).then(() => input.value = "");
}

function deleteMessage(msgId) {
  if (!chatRef) return;
  chatRef.child(msgId).remove().then(() => {
    const msgDiv = document.getElementById("msg-" + msgId);
    if (msgDiv) msgDiv.remove();
  });
}

function deleteAllMessages() {
  if (!chatRef) return;
  if (confirm("Yakin hapus semua chat?")) {
    chatRef.remove().then(() => document.getElementById("chatBox").innerHTML = "");
  }
}

/* === CHART UPDATE === */
function updateCharts() {
  if (!voltageChart) {
    const ctxV = document.getElementById("voltageChart").getContext("2d");
    voltageChart = new Chart(ctxV, {
      type: "line",
      data: { labels: voltageLabels, datasets: [{ label: "Voltage (V)", data: voltageData, borderColor: "#2575fc", fill: false, tension: 0.3 }] },
      options: { scales: { y: { beginAtZero: true } } },
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
      options: { scales: { y: { beginAtZero: true } } },
    });
  } else {
    ampereChart.data.labels = ampereLabels;
    ampereChart.data.datasets[0].data = ampereData;
    ampereChart.update();
  }
}

/* === DARK MODE === */
function toggleDarkMode() {
  const body = document.body;
  const isDark = body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}

function applySavedTheme() {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

/* === EVENT LISTENER === */
window.addEventListener("load", () => {
  const savedUser = localStorage.getItem("currentUser");
  const savedToken = localStorage.getItem("currentToken");
  const savedAdmin = localStorage.getItem("isAdmin") === "true";

  if (!savedUser || !savedToken) {
    showPage("loginPage");
    return;
  }

  currentUser = savedUser;
  currentToken = savedToken;
  isAdmin = savedAdmin;
  currentUserId = savedUser.replace(/\W/g, "_");

  initPanel(currentToken);

  document.getElementById("btnOn")?.addEventListener("click", () => {
    if (isAdmin && panelRef) panelRef.update({ status: "ON" });
  });

  document.getElementById("btnOff")?.addEventListener("click", () => {
    if (isAdmin && panelRef) panelRef.update({ status: "OFF" });
  });

  applySavedTheme();
  document.getElementById("darkModeBtn")?.addEventListener("click", toggleDarkMode);
});
