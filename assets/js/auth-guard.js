/* ================================
   AUTH GUARD - POS PRO
================================ */

(function () {
  const currentUser = localStorage.getItem("currentUser");

  // الصفحات المسموح فتحها بدون تسجيل
  const publicPages = [
    "login.html",
    "register.html"
  ];

  const currentPage = window.location.pathname.split("/").pop();

  // لو الصفحة مش عامة ومفيش مستخدم
  if (!currentUser && !publicPages.includes(currentPage)) {
    window.location.href = "login.html";
  }

})();
