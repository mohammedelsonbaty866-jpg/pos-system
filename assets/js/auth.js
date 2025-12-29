/* ===============================
   AUTH SYSTEM - POS PRO
================================ */

const USERS_KEY = "pos_users";
const SESSION_KEY = "pos_session";

/* ===== Helpers ===== */
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* ===== UI Switch ===== */
function showRegister() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("registerBox").style.display = "block";
}

function showLogin() {
  document.getElementById("registerBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

/* ===== Register ===== */
function register() {
  const name = document.getElementById("regName").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!name || !phone || !password) {
    alert("من فضلك املأ جميع البيانات");
    return;
  }

  let users = getUsers();

  const exists = users.find(u => u.phone === phone);
  if (exists) {
    alert("رقم الهاتف مسجل بالفعل");
    return;
  }

  const user = {
    id: Date.now(),
    name,
    phone,
    password,
    cashiers: [],   // الكاشير اللي هيضيفهم لاحقًا
    createdAt: new Date().toISOString()
  };

  users.push(user);
  saveUsers(users);

  alert("تم إنشاء الحساب بنجاح");
  showLogin();
}

/* ===== Login ===== */
function login() {
  const phone = document.getElementById("loginPhone").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!phone || !password) {
    alert("أدخل رقم الهاتف وكلمة المرور");
    return;
  }

  const users = getUsers();
  const user = users.find(
    u => u.phone === phone && u.password === password
  );

  if (!user) {
    alert("بيانات الدخول غير صحيحة");
    return;
  }

  // حفظ الجلسة
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      userId: user.id,
      loginAt: Date.now()
    })
  );

  // توجيه للنظام
  window.location.href = "index.html";
}
