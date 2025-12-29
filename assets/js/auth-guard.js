// ===============================
// AUTH GUARD - POS PRO
// ===============================

// الصفحات المسموح فتحها بدون تسجيل
const publicPages = [
  'login.html',
  'register.html'
];

// اسم الصفحة الحالية
const currentPage = window.location.pathname.split('/').pop();

// قراءة المستخدم الحالي
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// لو الصفحة محمية ومفيش تسجيل دخول → تحويل لصفحة الدخول
if (!publicPages.includes(currentPage)) {
  if (!currentUser) {
    window.location.href = 'login.html';
  }
}

// منع فتح login أو register لو المستخدم مسجل دخول
if (publicPages.includes(currentPage) && currentUser) {
  window.location.href = 'index.html';
}
