/* ===============================
   AUTH GUARD - PRO VERSION
   =============================== */

/* منع الكاش من المتصفح */
if (window.performance && performance.navigation.type === 2) {
  location.reload(true);
}

/* جلب المستخدم */
const loggedUser = localStorage.getItem("loggedUser");

/* لو مش مسجل دخول */
if (!loggedUser) {
  location.href = "auth/login.html";
}

/* تحويل النص لكائن */
const currentUser = loggedUser ? JSON.parse(loggedUser) : null;

/* دالة تسجيل الخروج */
function logout() {
  localStorage.removeItem("loggedUser");
  location.href = "auth/login.html";
}

/* منع الوصول حسب الصلاحية */
function requireRole(role) {
  if (!currentUser || currentUser.role !== role) {
    alert("غير مصرح لك بالدخول");
    logout();
  }
}

/* استخدام عام */
console.log("Auth Guard Loaded:", currentUser);
