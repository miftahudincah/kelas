/* === OPEN USER PROFILE === */
function openUserProfile(userId) {
  if (!userId) {
    alert("❌ User ID tidak valid!");
    return;
  }

  db.ref("users/" + userId).get().then(snap => {
    if (!snap.exists()) {
      alert("❌ Profil user tidak ditemukan.");
      return;
    }

    const data = snap.val();
    const isOwnProfile = (currentUserId === userId);

    // Elemen profil
    const emailEl   = document.getElementById("profileEmail");
    const tokenEl   = document.getElementById("profileToken");
    const ibuEl     = document.getElementById("profileIbu");
    const photoEl   = document.getElementById("photoPreview");
    const statusEl  = document.getElementById("profileStatus");
    const lastEl    = document.getElementById("profileLastLogin");
    const roleEl    = document.getElementById("profileRole"); // ⬅️ elemen tambahan untuk role

    // Isi data
    if (emailEl) emailEl.innerText = data.email || "-";
    if (tokenEl) tokenEl.innerText = data.token || "-";
    if (ibuEl)   ibuEl.innerText   = isOwnProfile ? (data.ibu || "-") : "●●●";
    if (photoEl) photoEl.src       = data.photoURL || "https://via.placeholder.com/120";
    if (roleEl)  roleEl.innerText  = data.isAdmin ? "Guru" : "Siswa"; // ⬅️ tampilkan role (Guru/Siswa)

    if (statusEl && lastEl) {
      if (data.online) {
        statusEl.innerText = "Online";
        statusEl.className = "online";
        lastEl.innerText   = "Sedang Online";
      } else {
        statusEl.innerText = "Offline";
        statusEl.className = "offline";
        lastEl.innerText   = data.lastSeen
          ? "Terakhir dilihat: " + new Date(data.lastSeen).toLocaleString("id-ID")
          : "-";
      }
    }

    // Input foto & tombol simpan hanya muncul di profil sendiri
    const photoInput = document.getElementById("photoInput");
    const saveBtn    = document.querySelector("#profilePage button.btn-primary");

    if (isOwnProfile) {
      if (photoInput) photoInput.style.display = "block";
      if (saveBtn)    saveBtn.style.display    = "block";
    } else {
      if (photoInput) photoInput.style.display = "none";
      if (saveBtn)    saveBtn.style.display    = "none";
    }

    // Buka halaman profil
    showPage("profilePage");
  }).catch(err => {
    console.error("Error membuka profil:", err);
    alert("❌ Terjadi kesalahan saat membuka profil.");
  });
}

/* === UPLOAD FOTO PROFIL === */
function uploadProfilePhoto(file) {
  if (!currentUserId || !file) {
    alert("❌ Tidak ada user login atau file tidak valid!");
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    const base64String = e.target.result;
    db.ref("users/" + currentUserId).update({ photoURL: base64String })
      .then(() => {
        const photoEl = document.getElementById("photoPreview");
        if (photoEl) photoEl.src = base64String;
        alert("✅ Foto profil berhasil diperbarui!");
      })
      .catch(err => {
        console.error("Gagal update foto:", err);
        alert("❌ Gagal memperbarui foto profil!");
      });
  };
  reader.readAsDataURL(file);
}

/* === EVENT LISTENER === */
window.addEventListener("load", () => {
  const photoInput = document.getElementById("photoInput");
  const btnProfile = document.getElementById("btnOpenProfile");
  const userList   = document.getElementById("userList");

  // Upload foto profil
  if (photoInput) {
    photoInput.addEventListener("change", e => {
      const file = e.target.files[0];
      if (file) uploadProfilePhoto(file);
    });
  }

  // Buka profil sendiri
  if (btnProfile) {
    btnProfile.addEventListener("click", () => { 
      if (currentUserId) {
        openUserProfile(currentUserId);
      } else {
        alert("❌ User belum login!");
      }
    });
  }

  // Klik user lain di daftar panel → buka profil
  if (userList) {
    userList.addEventListener("click", e => {
      const card = e.target.closest(".user-item");
      if (card) {
        const uid = card.getAttribute("data-userid");
        if (uid) openUserProfile(uid);
      }
    });
  }
});
