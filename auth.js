/* ===============================
   AUTH & ROLES SYSTEM
   Admin / Cashier
================================ */

// مستخدمين افتراضيين (نسخة تجريبية)
const USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "cashier", password: "1234", role: "cashier" }
];

// تسجيل الدخول
function login(){
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  const found = USERS.find(
    u => u.username === user && u.password === pass
  );

  if(!found){
    alert("❌ اسم المستخدم أو كلمة المرور خطأ");
    return;
  }

  localStorage.setItem("loggedUser", JSON.stringify(found));
  showApp();
}

// تسجيل الخروج
function logout(){
  localStorage.removeItem("loggedUser");
  location.reload();
}

// إظهار التطبيق بعد الدخول
function showApp(){
  const loginScreen = document.getElementById("loginScreen");
  const appScreen   = document.getElementById("appScreen");

  loginScreen.classList.remove("active");
  appScreen.classList.add("active");

  applyPermissions();
}

// صلاحيات المستخدم
function applyPermissions(){
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if(!user) return;

  document.getElementById("userName").innerText =
    user.username + " (" + user.role + ")";

  // لو كاشير نخفي الإدارة
  if(user.role === "cashier"){
    hide("btnProducts");
    hide("btnCustomers");
    hide("btnUsers");
    hide("btnReports");
  }
}

// إخفاء عنصر
function hide(id){
  const el = document.getElementById(id);
  if(el) el.style.display = "none";
}

// فحص الجلسة عند التشغيل
window.onload = () => {
  const user = localStorage.getItem("loggedUser");
  if(user){
    showApp();
  }
};
