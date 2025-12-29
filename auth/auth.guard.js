// auth-guard.js
(function () {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // مش مسجل دخول
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // تحديد الصفحة الحالية
  const page = window.location.pathname.split("/").pop();

  // الصلاحيات
  const permissions = {
    admin: ["index.html", "products.html", "inventory.html", "returns.html", "reports.html"],
    cashier: ["index.html"]
  };

  // لو الصفحة مش مسموحة
  if (!permissions[user.role]?.includes(page)) {
    alert("❌ ليس لديك صلاحية الدخول لهذه الصفحة");
    window.location.href = "index.html";
  }
})();
