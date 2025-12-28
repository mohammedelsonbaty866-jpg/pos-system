/* ================= USERS & ROLES ================= */

const USERS = [
  {
    username: "admin",
    password: "1234",
    role: "admin" // مدير
  },
  {
    username: "cashier",
    password: "1111",
    role: "cashier" // كاشير
  }
];

/* تحقق من تسجيل الدخول */
function getLoggedUser(){
  return JSON.parse(localStorage.loggedUser || "null");
}

/* منع فتح النظام بدون تسجيل */
function requireLogin(){
  const user = getLoggedUser();
  if(!user){
    window.location.href = "login.html";
  }
}

/* التحقق من الصلاحيات */
function hasRole(role){
  const user = getLoggedUser();
  return user && user.role === role;
}

/* تسجيل خروج */
function logout(){
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}
