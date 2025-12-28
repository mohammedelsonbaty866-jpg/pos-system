/* ===============================
   نظام تسجيل الدخول
   =============================== */

// بيانات افتراضية (نغيّرها بعدين لنسخة مدفوعة)
const USERS = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "cashier", password: "1234", role: "cashier" }
];

// لو مسجل دخول قبل كده
if (localStorage.getItem("loggedUser")) {
  window.location.href = "../index.html";
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  if (!username || !password) {
    errorBox.innerText = "من فضلك أدخل البيانات كاملة";
    return;
  }

  const user = USERS.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    errorBox.innerText = "بيانات الدخول غير صحيحة";
    return;
  }

  // حفظ الجلسة
  localStorage.setItem("loggedUser", JSON.stringify(user));

  // تحويل للبرنامج
  window.location.href = "../index.html";
}
