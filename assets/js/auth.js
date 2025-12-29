/* ===============================
   AUTH SYSTEM - POS PRO
================================ */

/*
LocalStorage Structure:

users = [
  {
    shopName: "",
    phone: "",
    password: ""
  }
]

currentUser = {
  phone: ""
}
*/

// ===== GET DATA =====
let users = JSON.parse(localStorage.getItem("users") || "[]");
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

// ===== REGISTER =====
function register() {
  const shopName = document.getElementById("shopName")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const errorBox = document.getElementById("errorMsg");

  if (!shopName || !phone || !password) {
    errorBox.innerText = "جميع الحقول مطلوبة";
    return;
  }

  // منع التكرار
  const exists = users.find(u => u.phone === phone);
  if (exists) {
    errorBox.innerText = "رقم الهاتف مسجل بالفعل";
    return;
  }

  // إنشاء الحساب
  const user = {
    shopName,
    phone,
    password
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  // تسجيل دخول تلقائي
  localStorage.setItem("currentUser", JSON.stringify({ phone }));

  // حفظ اسم المتجر في الإعدادات
  localStorage.setItem(
    "settings",
    JSON.stringify({ shopName })
  );

  window.location.href = "index.html";
}

// ===== LOGIN =====
function login() {
  const phone = document.getElementById("phone")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const errorBox = document.getElementById("errorMsg");

  if (!phone || !password) {
    errorBox.innerText = "أدخل رقم الهاتف وكلمة المرور";
    return;
  }

  const user = users.find(
    u => u.phone === phone && u.password === password
  );

  if (!user) {
    errorBox.innerText = "بيانات الدخول غير صحيحة";
    return;
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify({ phone })
  );

  window.location.href = "index.html";
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ===== AUTH GUARD =====
function requireAuth() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    window.location.href = "login.html";
  }
}

// ===== GET CURRENT USER =====
function getCurrentUser() {
  const session = JSON.parse(localStorage.getItem("currentUser"));
  if (!session) return null;

  return users.find(u => u.phone === session.phone);
}
