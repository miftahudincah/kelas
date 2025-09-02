/* ===== UJIAN.JS FIX TANPA DUPLIKAT & TOKEN BASED ===== */
const examRef = firebase.database().ref("exams");
const answerRef = firebase.database().ref("exam_answers");

let examListener = null; // simpan listener soal
let answerListeners = {}; // simpan listener jawaban per soal

function loadExam() {
  if (!currentUserId || !currentToken) return;
  const examList = document.getElementById("examList");

  // matikan listener lama
  if (examListener) {
    firebase.database().ref("exams/" + currentToken).off("value", examListener);
  }
  Object.keys(answerListeners).forEach(q => {
    answerRef.child(currentToken).child(q).off("value", answerListeners[q]);
  });
  answerListeners = {};

  firebase.database().ref("users").child(currentUserId).once("value", snap => {
    const userData = snap.val();
    if (!userData) return;

    const role = userData.isAdmin ? "guru" : "siswa";

    // render soal realtime per token
    examListener = snapshot => {
      examList.innerHTML = ""; // clear semua

      // Form tambah soal hanya untuk guru
      if (role === "guru") {
        const adminCard = document.createElement("div");
        adminCard.className = "card";
        adminCard.innerHTML = `
          <h4>Tambah Soal</h4>
          <input type="text" id="newQuestion" placeholder="Masukkan soal">
          <input type="text" id="newAnswer" placeholder="Jawaban benar">
          <button class="btn-primary" onclick="addQuestion()">Simpan Soal</button>
        `;
        examList.appendChild(adminCard);
      }

      // render semua soal token ini
      const exams = snapshot.val() || {};
      Object.keys(exams).forEach(key => {
        const exam = exams[key];
        const card = document.createElement("div");
        card.className = "card";

        if (role === "guru") {
          card.innerHTML = `
            <p><strong>Soal:</strong> ${exam.question}</p>
            <p><strong>Jawaban Benar:</strong> ${exam.answer}</p>
            <button class="btn-danger" onclick="deleteQuestion('${key}')">Hapus Soal</button>
            <div id="answers-${key}" class="answers-block"><i>Menunggu jawaban...</i></div>
          `;

          // tampilkan semua jawaban user untuk soal ini
          loadAllAnswers(key, `answers-${key}`);

        } else {
          card.innerHTML = `
            <p><strong>Soal:</strong> ${exam.question}</p>
            <input type="text" id="answer-${key}" placeholder="Jawabanmu">
            <button class="btn-primary" onclick="submitAnswer('${key}')">Kirim Jawaban</button>
          `;
        }

        examList.appendChild(card);
      });
    };

    firebase.database().ref("exams/" + currentToken).on("value", examListener);
  });
}

// Guru tampilkan semua jawaban user
function loadAllAnswers(questionKey, containerId) {
  if (!currentToken) return;
  const container = document.getElementById(containerId);

  const listener = snap => {
    container.innerHTML = "<h5>Jawaban Siswa:</h5>";
    const allAnswers = snap.val() || {};
    console.log("📥 Data jawaban snapshot:", allAnswers);

    Object.keys(allAnswers).forEach(userId => {
      const userAnswers = allAnswers[userId];
      if (userAnswers && userAnswers[questionKey]) {
        const ans = userAnswers[questionKey];

        // Ambil email user dari tabel users
        firebase.database().ref("users/" + userId).once("value", userSnap => {
          const uData = userSnap.val() || {};
          const email = uData.email || "Tanpa Email";

          const p = document.createElement("p");
          p.innerHTML = `<b>${email}:</b> ${ans.answer}`;
          container.appendChild(p);
        });
      }
    });
  };

  answerRef.child(currentToken).on("value", listener);
  answerListeners[questionKey] = listener;
}

// Guru tambah soal
function addQuestion() {
  const question = document.getElementById("newQuestion").value.trim();
  const answer = document.getElementById("newAnswer").value.trim();
  if (!question || !answer) return alert("Soal dan jawaban wajib diisi!");
  if (!currentToken) return alert("Token ujian tidak ditemukan!");

  const newKey = examRef.child(currentToken).push().key;
  examRef.child(currentToken).child(newKey).set({ question, answer }).then(() => {
    alert("Soal berhasil ditambahkan!");
    document.getElementById("newQuestion").value = "";
    document.getElementById("newAnswer").value = "";
  });
}

// Guru hapus soal + jawaban terkait
function deleteQuestion(key) {
  if (confirm("Yakin ingin menghapus soal ini?")) {
    examRef.child(currentToken).child(key).remove();
    answerRef.child(currentToken).once("value", snap => {
      const all = snap.val() || {};
      Object.keys(all).forEach(uid => {
        if (all[uid][key]) {
          answerRef.child(currentToken).child(uid).child(key).remove();
        }
      });
    });
  }
}

// Siswa kirim jawaban
function submitAnswer(key) {
  const input = document.getElementById(`answer-${key}`);
  const answer = input.value.trim();
  if (!answer) return alert("Jawaban tidak boleh kosong!");
  if (!currentToken) return alert("Token ujian tidak ditemukan!");
  if (!currentUserId) return alert("User belum login!");

  const path = `exam_answers/${currentToken}/${currentUserId}/${key}`;
  console.log("📤 Simpan jawaban ke:", path, "=>", answer);

  answerRef.child(currentToken).child(currentUserId).child(key).set({
    answer,
    timestamp: Date.now()
  }).then(() => {
    alert("Jawaban berhasil dikirim!");
    input.value = "";
  }).catch(err => {
    console.error("❌ Gagal simpan jawaban:", err);
  });
}

/* ===== BUTTONS ===== */
document.getElementById("btnOpenProfile").addEventListener("click", () => {
  if (currentUserId) openUserProfile(currentUserId);
  else alert("❌ User belum login!");
});

document.getElementById("btnExam").addEventListener("click", () => {
  showPage("examPage");
  loadExam();
});

// default
showPage("loginPage");
