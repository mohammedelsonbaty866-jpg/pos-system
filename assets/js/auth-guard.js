/* ================================
   AUTH GUARD
   يمنع الدخول بدون تسجيل
================================ */

(function () {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // الصفحات المسموح فتحها بدون تسجيل
  const publicPages = ["login.html", "register.html"];

  const currentPage = window.location.pathname.split("/").pop();

  if (!user && !publicPages.includes(currentPage)) {
    window.location.href = "login.html";
  }
})();
