/* ===============================
   AUTH SYSTEM | POS PRO
   =============================== */

/* ===== HELPERS ===== */
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/* ===== REGISTER ===== */
function register() {
  const shopName = document.getElementById("shopName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (!shopName || !phone || !password || !confirm) {
    alert("من فضلك أكمل جميع البيانات");
    return;
  }

  if (password !== confirm) {
    alert("كلمتا المرور غير متطابقتين");
    return;
  }

  let users = getUsers();

  if (users.find(u => u.phone === phone)) {
    alert("رقم الهاتف مسجل بالفعل");
    return;
  }

  const newUser = {
    id: Date.now(),
    shopName,
    phone,
    password,
    role: "owner",
    cashiers: []
  };

  users.push(newUser);
  saveUsers(users);

  localStorage.setItem("currentUser", JSON.stringify(newUser));

  window.location.href = "index.html";
}

/* ===== LOGIN ===== */
function login() {
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;

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

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "index.html";
}

/* ===== LOGOUT ===== */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

/* ===== AUTH GUARD ===== */
function authGuard() {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    window.location.href = "login.html";
  }
}
