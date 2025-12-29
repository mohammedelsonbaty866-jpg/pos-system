/* ===============================
   AUTH SYSTEM (Owner Account)
   =============================== */

const USERS_KEY = "pos_users";
const SESSION_KEY = "pos_current_user";

/* ===== تحميل المستخدمين ===== */
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

/* ===== حفظ المستخدمين ===== */
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* ===== إنشاء حساب ===== */
function register() {
  const name = document.getElementById("registerName").value.trim();
  const phone = document.getElementById("registerPhone").value.trim();
  const password = document.getElementById("registerPassword").value;

  if (!name || !phone || !password) {
    alert("من فضلك اكمل جميع البيانات");
    return;
  }

  const users = getUsers();

  const exists = users.find(u => u.phone === phone);
  if (exists) {
    alert("رقم الهاتف مسجل بالفعل");
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    phone,
    password,
    role: "owner",
    cashiers: []
  };

  users.push(newUser);
  saveUsers(users);

  alert("تم إنشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن");

  document.getElementById("registerName").value = "";
  document.getElementById("registerPhone").value = "";
  document.getElementById("registerPassword").value = "";
}

/* ===== تسجيل دخول ===== */
function login() {
  const phone = document.getElementById("loginPhone").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!phone || !password) {
    alert("ادخل رقم الهاتف وكلمة المرور");
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

  localStorage.setItem(SESSION_KEY, JSON.stringify({
    id: user.id,
    name: user.name,
    role: user.role
  }));

  window.location.href = "index.html";
}

/* ===== تسجيل خروج ===== */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}
