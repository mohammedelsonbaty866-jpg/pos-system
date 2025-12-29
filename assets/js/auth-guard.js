/************************
 * AUTH GUARD
 * حماية الصفحات
 ************************/

/* ===== المستخدم الحالي ===== */
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function setCurrentUser(phone) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.phone === phone);
  localStorage.setItem("currentUser", JSON.stringify(user));
}

/* ===== تسجيل خروج ===== */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

/* ===== فحص الدخول ===== */
(function authGuard() {
  const publicPages = ["login.html", "register.html"];
  const currentPage = location.pathname.split("/").pop();

  if (publicPages.includes(currentPage)) return;

  const user = getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
  }
})();
