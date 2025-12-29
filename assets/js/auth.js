/* ===============================
   AUTH SYSTEM | POS PRO
   =============================== */

/* ===== HELPERS ===== */
function getUsers() {
  return JSON.parse(localStorage.getItem("pos_users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("pos_users", JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem("pos_current_user", JSON.stringify(user));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("pos_current_user"));
}

/* ===== REGISTER ===== */
function register() {
  const name = document.getElementById("registerName").value.trim();
  const phone = document.getElementById("registerPhone").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const errorBox = document.getElementById("registerError");

  errorBox.innerText = "";

  if (!name || !phone || !password) {
    errorBox.innerText = "جميع الحقول مطلوبة";
    return;
  }

  let users = getUsers();

  const exists = users.find(u => u.phone === phone);
  if (exists) {
    errorBox.innerText = "رقم الهاتف مسجل بالفعل";
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    phone,
    password,
    role: "owner", // صاحب النظام
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  window.location.href = "index.html";
}

/* ===== LOGIN ===== */
function login() {
  const phone = document.getElementById("loginPhone").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const errorBox = document.getElementById("loginError");

  errorBox.innerText = "";

  if (!phone || !password) {
    errorBox.innerText = "أدخل رقم الهاتف وكلمة المرور";
    return;
  }

  const users = getUsers();

  const user = users.find(
    u => u.phone === phone && u.password === password
  );

  if (!user) {
    errorBox.innerText = "بيانات الدخول غير صحيحة";
    return;
  }

  setCurrentUser(user);
  window.location.href = "index.html";
}

/* ===== LOGOUT ===== */
function logout() {
  localStorage.removeItem("pos_current_user");
  window.location.href = "login.html";
}
