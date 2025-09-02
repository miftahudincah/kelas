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
