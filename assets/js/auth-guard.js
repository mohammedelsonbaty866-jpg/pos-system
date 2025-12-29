/* ===============================
   AUTH GUARD - POS PRO
================================ */

const SESSION_KEY = "pos_session";
const USERS_KEY = "pos_users";

/* ===== Check Session ===== */
(function checkAuth() {
  const session = JSON.parse(localStorage.getItem(SESSION_KEY));

  if (!session || !session.userId) {
    // مش مسجل دخول
    window.location.href = "login.html";
    return;
  }

  // تأكد إن المستخدم لسه موجود
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const userExists = users.find(u => u.id === session.userId);

  if (!userExists) {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = "login.html";
  }
})();

/* ===== Logout ===== */
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}
