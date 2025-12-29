/* ================================
   AUTH SYSTEM (REGISTER + LOGIN)
   ================================ */

/* ===== HELPERS ===== */
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function setSession(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function getSession() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

/* ================================
   REGISTER
   ================================ */
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !phone || !password) {
      alert("من فضلك أكمل جميع البيانات");
      return;
    }

    let users = getUsers();

    // منع تكرار رقم الهاتف
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
      cashiers: [], // الكاشير اللي هيضيفهم صاحب الحساب
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    // تسجيل دخول تلقائي
    setSession(newUser);

    window.location.href = "index.html";
  });
}

/* ================================
   LOGIN
   ================================ */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    let users = getUsers();

    const user = users.find(
      u => u.phone === phone && u.password === password
    );

    if (!user) {
      alert("بيانات الدخول غير صحيحة");
      return;
    }

    setSession(user);
    window.location.href = "index.html";
  });
}

/* ================================
   LOGOUT
   ================================ */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
