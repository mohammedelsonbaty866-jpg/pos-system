// assets/js/core/auth-guard.js

(function () {
  const user = localStorage.getItem("currentUser");
  if (!user) {
    window.location.href = "login.html";
  }
})();
