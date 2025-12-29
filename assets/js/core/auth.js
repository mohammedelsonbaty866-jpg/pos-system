// assets/js/core/auth.js

function register(username, password) {
  if (!username || !password) {
    alert("أدخل اسم المستخدم وكلمة المرور");
    return;
  }

  const exists = DB.users.find(u => u.username === username);
  if (exists) {
    alert("المستخدم موجود بالفعل");
    return;
  }

  DB.users.push({
    id: generateId(),
    username,
    password,
    role: "admin" // افتراضي
  });

  saveDB();
  alert("تم إنشاء الحساب");
  window.location.href = "login.html";
}

function login(username, password) {
  const user = DB.users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    alert("بيانات الدخول غير صحيحة");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
