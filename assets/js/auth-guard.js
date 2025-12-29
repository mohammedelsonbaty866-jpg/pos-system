/*************************************************
 * AUTH GUARD
 * حماية الصفحات من الدخول بدون تسجيل
 *************************************************/

(function () {

  // الصفحات المسموح فتحها بدون تسجيل
  const publicPages = [
    "login.html",
    "register.html"
  ];

  const currentPage = location.pathname.split("/").pop();

  // لو الصفحة عامة → خروج
  if (publicPages.includes(currentPage)) return;

  // فحص المستخدم الحالي
  const user = localStorage.getItem("currentUser");

  if (!user) {
    location.replace("login.html");
    return;
  }

  try {
    const parsed = JSON.parse(user);
    if (!parsed.phone) {
      throw "invalid user";
    }
  } catch (e) {
    localStorage.removeItem("currentUser");
    location.replace("login.html");
  }

})();
