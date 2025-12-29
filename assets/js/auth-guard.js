/* ===============================
   AUTH GUARD
   =============================== */

const SESSION_KEY = "pos_current_user";

/* ===== التحقق من تسجيل الدخول ===== */
(function authGuard() {
  const session = localStorage.getItem(SESSION_KEY);

  if (!session) {
    window.location.href = "login.html";
  }
})();
