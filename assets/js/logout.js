// logout.js

function logout() {
  const confirmLogout = confirm("هل أنت متأكد من تسجيل الخروج؟");

  if (!confirmLogout) return;

  // مسح بيانات الجلسة
  localStorage.removeItem("loggedUser");

  // تحويل لصفحة تسجيل الدخول
  window.location.replace("login.html");
}
