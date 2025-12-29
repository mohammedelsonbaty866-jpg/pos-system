/* ================================
   AUTH SYSTEM - POS PRO
================================ */

// تخزين المستخدمين
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// ================================
// إنشاء حساب جديد
// ================================
function register() {
  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const error = document.getElementById("error");

  if (!name || !phone) {
    error.innerText = "جميع الحقول مطلوبة";
    return;
  }

  let users = getUsers();

  const exists = users.find(u => u.phone === phone);
  if (exists) {
    error.innerText = "رقم الهاتف مسجل بالفعل";
    return;
  }

  const user = {
    id: Date.now(),
    name,
    phone,
    role: "owner",      // صاحب الحساب
    cashiers: [],       // الكاشير هيضافوا لاحقًا
    createdAt: new Date().toISOString()
  };

  users.push(user);
  saveUsers(users);

  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location.href = "index.html";
}

// ================================
// تسجيل الدخول
// ================================
function login() {
  const phone = document.getElementById("phone")?.value.trim();
  const error = document.getElementById("error");

  if (!phone) {
    error.innerText = "ادخل رقم الهاتف";
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.phone === phone);

  if (!user) {
    error.innerText = "لا يوجد حساب بهذا الرقم";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "index.html";
}

// ================================
// تسجيل الخروج
// ================================
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ================================
// حماية الصفحات
// ================================
function authGuard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    window.location.href = "login.html";
  }
}

// تشغيل الحماية تلقائيًا
authGuard();
