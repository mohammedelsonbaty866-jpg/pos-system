/* ================================
   AUTH SYSTEM | POS PRO
   تسجيل حساب - تسجيل دخول - حماية
================================ */

// ===== Helpers =====
function getUsers() {
  return JSON.parse(localStorage.getItem("pos_users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("pos_users", JSON.stringify(users));
}

function setSession(user) {
  localStorage.setItem("pos_session", JSON.stringify(user));
}

function getSession() {
  return JSON.parse(localStorage.getItem("pos_session"));
}

function logout() {
  localStorage.removeItem("pos_session");
  window.location.href = "login.html";
}

// ===== Register =====
function register() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (!name || !phone || !password || !confirm) {
    alert("من فضلك املأ جميع الحقول");
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

  const user = {
    id: Date.now(),
    name,
    phone,
    password,
    role: "owner",   // صاحب النظام
    createdAt: new Date().toISOString()
  };

  users.push(user);
  saveUsers(users);

  alert("تم إنشاء الحساب بنجاح");
  window.location.href = "login.html";
}

// ===== Login =====
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

  setSession({
    id: user.id,
    name: user.name,
    phone: user.phone,
    role: user.role
  });

  window.location.href = "index.html";
}

// ===== Auth Guard =====
(function authGuard() {
  const protectedPages = [
    "index.html",
    "products.html",
    "inventory.html",
    "returns.html",
    "reports.html",
    "settings.html"
  ];

  const page = location.pathname.split("/").pop();

  if (protectedPages.includes(page)) {
    if (!getSession()) {
      window.location.href = "login.html";
    }
  }
})();
