/*************************************************
 * AUTH GUARD
 * حماية الصفحات (لا تفتح إلا بعد تسجيل الدخول)
 *************************************************/

// المستخدم الحالي
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// لو مفيش تسجيل دخول
if (!currentUser) {
  window.location.href = "login.html";
}

// =====================
// دوال مساعدة
// =====================

// تسجيل خروج
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// جلب المستخدم الحالي
function getCurrentUser() {
  return currentUser;
}
