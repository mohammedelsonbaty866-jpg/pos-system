/* =====================================
   AUTH GUARD
   يمنع فتح أي صفحة بدون تسجيل دخول
   ===================================== */

(function () {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // الصفحات المسموح فتحها بدون تسجيل
  const publicPages = ["login.html", "register.html"];

  const currentPage = window.location.pathname.split("/").pop();

  // لو المستخدم مش مسجل دخول
  if (!user && !publicPages.includes(currentPage)) {
    window.location.href = "login.html";
    return;
  }

  // لو مسجل دخول وحاول يفتح login أو register
  if (user && publicPages.includes(currentPage)) {
    window.location.href = "index.html";
  }
})();
