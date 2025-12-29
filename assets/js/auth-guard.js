/* ===============================
   AUTH GUARD | POS PRO
   =============================== */

(function () {
  const user = localStorage.getItem("pos_current_user");

  if (!user) {
    window.location.href = "login.html";
  }
})();
