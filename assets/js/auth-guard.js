/***********************
 * AUTH GUARD
 * يمنع الدخول بدون تسجيل
 ***********************/

(function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // لو مفيش مستخدم مسجل
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  // التحقق من الصلاحيات (لو احتجنا مستقبلاً)
  window.USER_ROLE = currentUser.role; // owner | cashier
  window.USER_NAME = currentUser.name || "صاحب المتجر";
})();
