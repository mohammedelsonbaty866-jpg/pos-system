/* =========================
   AUTH GUARD - POS PRO
========================= */

const SESSION_KEY = "pos_session";

(function () {
  const session = localStorage.getItem(SESSION_KEY);

  if (!session) {
    window.location.replace("login.html");
  }
})();
