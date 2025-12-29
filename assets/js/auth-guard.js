// auth-guard.js
(function () {

  const user = localStorage.getItem("loggedUser");

  // لو مفيش مستخدم مسجل دخول
  if (!user) {
    // منع الدخول + تحويل لصفحة الدخول
    window.location.replace("login.html");
    return;
  }

  // تحويل النص لكائن
  try {
    const parsedUser = JSON.parse(user);

    // أمان إضافي
    if (!parsedUser.phone) {
      localStorage.removeItem("loggedUser");
      window.location.replace("login.html");
    }

  } catch (e) {
    localStorage.removeItem("loggedUser");
    window.location.replace("login.html");
  }

})();
