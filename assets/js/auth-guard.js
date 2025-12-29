/* ===============================
   AUTH GUARD | POS PRO
   =============================== */

(function () {
  const user = localStorage.getItem("pos_current_user");

  if (!user) {
    window.location.href = "login.html";
  }
})();
(function authGuard(){
  const currentUser = localStorage.getItem("pos_current_user");

  // لو مش مسجل دخول
  if(!currentUser){
    window.location.href = "login.html";
  }
})();
