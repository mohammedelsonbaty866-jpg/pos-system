// auth-guard.js
(function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    // لو مفيش مستخدم مسجل
    window.location.href = "login.html";
    return;
  }

  // تحديد الصلاحيات حسب الصفحة
  const page = window.location.pathname.split("/").pop();

  // صفحات مسموح بها للمالك فقط
  const ownerOnlyPages = [
    "settings.html",
    "reports.html",
    "cashiers.html"
  ];

  // لو كاشير وحاول يدخل صفحة مالك
  if (
    currentUser.role === "cashier" &&
    ownerOnlyPages.includes(page)
  ) {
    alert("غير مسموح بالدخول لهذه الصفحة");
    window.location.href = "index.html";
  }
})();
