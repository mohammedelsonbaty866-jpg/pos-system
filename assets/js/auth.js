/* ================================
   AUTH SYSTEM (Register & Login)
================================ */

// جلب المستخدمين
function getUsers() {
  return getData("users", []);
}

// حفظ المستخدمين
function saveUsers(users) {
  setData("users", users);
}

/* ================================
   Register
================================ */

function registerUser() {
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!phone || !password) {
    alert("من فضلك أدخل رقم الهاتف وكلمة المرور");
    return;
  }

  let users = getUsers();

  const exists = users.find(u => u.phone === phone);
  if (exists) {
    alert("رقم الهاتف مسجل بالفعل");
    return;
  }

  const newUser = {
    id: Date.now(),
    phone,
    password,
    role: "owner",     // صاحب الحساب
    cashiers: []       // الكاشيرز لاحقاً
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  window.location.href = "index.html";
}

/* ================================
   Login
================================ */

function loginUser() {
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  let users = getUsers();

  const user = users.find(
    u => u.phone === phone && u.password === password
  );

  if (!user) {
    alert("بيانات الدخول غير صحيحة");
    return;
  }

  setCurrentUser(user);
  window.location.href = "index.html";
}

/* ================================
   Logout
================================ */

function logout() {
  clearCurrentUser();
  window.location.href = "login.html";
}
