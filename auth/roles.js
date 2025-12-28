/* ===============================
   ROLES & PERMISSIONS
   =============================== */

const userData = localStorage.getItem("loggedUser");
const currentUser = userData ? JSON.parse(userData) : null;

/*
ROLES:
- admin   → كل الصلاحيات
- cashier → بيع فقط
- viewer  → تقارير فقط
*/

function hasRole(role) {
  return currentUser && currentUser.role === role;
}

function isAdmin() {
  return hasRole("admin");
}

function isCashier() {
  return hasRole("cashier");
}

function isViewer() {
  return hasRole("viewer");
}

/* إخفاء العناصر حسب الصلاحية */
function applyPermissions() {
  if (!currentUser) return;

  /* عناصر للأدمن فقط */
  document.querySelectorAll("[data-role='admin']").forEach(el => {
    if (!isAdmin()) el.style.display = "none";
  });

  /* الكاشير */
  document.querySelectorAll("[data-role='cashier']").forEach(el => {
    if (!(isAdmin() || isCashier())) el.style.display = "none";
  });

  /* التقارير */
  document.querySelectorAll("[data-role='viewer']").forEach(el => {
    if (!(isAdmin() || isViewer())) el.style.display = "none";
  });
}

/* تشغيل تلقائي */
document.addEventListener("DOMContentLoaded", applyPermissions);
