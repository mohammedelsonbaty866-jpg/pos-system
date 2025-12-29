/************************
 * AUTH MODULE
 * تسجيل حساب + تسجيل دخول
 ************************/

/* ===== جلب المستخدمين ===== */
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

/* ===== تسجيل حساب جديد ===== */
function register() {
  const name = document.getElementById("regName").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const password = document.getElementById("regPassword").value;

  if (!name || !phone || !password) {
    alert("من فضلك أكمل جميع البيانات");
    return;
  }

  const users = getUsers();

  const exists = users.find(u => u.phone === phone);
  if (exists) {
    alert("رقم الهاتف مسجل بالفعل");
    return;
  }

  users.push({
    name,
    phone,
    password,
    role: "owner", // صاحب الحساب
    createdAt: new Date().toISOString()
  });

  saveUsers(users);
  setCurrentUser(phone);

  window.location.href = "index.html";
}

/* ===== تسجيل دخول ===== */
function login() {
  const phone = document.getElementById("loginPhone").value.trim();
  const password = document.getElementById("loginPassword").value;

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

  setCurrentUser(user.phone);
  window.location.href = "index.html";
}
