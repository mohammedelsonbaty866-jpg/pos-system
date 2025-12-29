/* ================================
   AUTH SYSTEM - POS PRO
================================ */

// LocalStorage Keys
const USERS_KEY = "pos_users";
const SESSION_KEY = "pos_session";

/* ================================
   HELPERS
================================ */
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

/* ================================
   REGISTER
================================ */
function register() {
  const storeName = document.getElementById("storeName")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const password = document.getElementById("password")?.value;
  const confirm = document.getElementById("confirmPassword")?.value;
  const error = document.getElementById("errorMsg");

  if (!storeName || !phone || !password || !confirm) {
    error.innerText = "جميع الحقول مطلوبة";
    return;
  }

  if (password !== confirm) {
    error.innerText = "كلمة المرور غير متطابقة";
    return;
  }

  let users = getUsers();

  if (users.find(u => u.phone === phone)) {
    error.innerText = "رقم الهاتف مسجل بالفعل";
    return;
  }

  const newUser = {
    id: Date.now(),
    storeName,
    phone,
    password,
    role: "owner",
    cashiers: [],
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  setSession(newUser);

  window.location.href = "index.html";
}

/* ================================
   LOGIN
================================ */
function login() {
  const phone = document.getElementById("phone")?.value.trim();
  const password = document.getElementById("password")?.value;
  const error = document.getElementById("errorMsg");

  if (!phone || !password) {
    error.innerText = "أدخل رقم الهاتف وكلمة المرور";
    return;
  }

  const users = getUsers();
  const user = users.find(
    u => u.phone === phone && u.password === password
  );

  if (!user) {
    error.innerText = "بيانات الدخول غير صحيحة";
    return;
  }

  setSession(user);
  window.location.href = "index.html";
}

/* ================================
   AUTH GUARD
================================ */
function requireAuth() {
  const session = getSession();
  if (!session) {
    window.location.href = "login.html";
  }
}

/* ================================
   LOGOUT
================================ */
function logout() {
  clearSession();
  window.location.href = "login.html";
}
