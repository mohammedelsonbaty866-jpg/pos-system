/* ==============================
   AUTH SYSTEM - POS PRO
================================ */

const USERS_KEY = "pos_users";
const SESSION_KEY = "pos_session";

/* ===== LOAD USERS ===== */
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

/* ===== SAVE USERS ===== */
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* ===== REGISTER ===== */
function register() {
  const name = document.getElementById("regName").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!name || !phone || !password) {
    alert("من فضلك املأ جميع الحقول");
    return;
  }

  let users = getUsers();

  // منع تكرار رقم الهاتف
  if (users.find(u => u.phone === phone)) {
    alert("رقم الهاتف مسجل بالفعل");
    return;
  }

  const user = {
    id: Date.now(),
    name,
    phone,
    password,
    createdAt: new Date().toISOString()
  };

  users.push(user);
  saveUsers(users);

  // تسجيل دخول تلقائي
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));

  alert("تم إنشاء الحساب بنجاح");
  window.location.href = "index.html";
}

/* ===== LOGIN ===== */
function login() {
  const phone = document.getElementById("loginPhone").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!phone || !password) {
    alert("أدخل رقم الهاتف وكلمة المرور");
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.phone === phone && u.password === password);

  if (!user) {
    alert("بيانات الدخول غير صحيحة");
    return;
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  window.location.href = "index.html";
}

/* ===== LOGOUT ===== */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

/* ===== CHECK AUTH ===== */
function checkAuth() {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) {
    window.location.href = "login.html";
  }
}

/* ===== GET CURRENT USER ===== */
function currentUser() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}
