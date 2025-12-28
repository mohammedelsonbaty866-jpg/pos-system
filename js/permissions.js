/* ===============================
   نظام الصلاحيات
   =============================== */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.CURRENT_USER) return;

  const role = window.CURRENT_USER.role;

  // عناصر خاصة بالمدير
  const adminOnly = document.querySelectorAll("[data-role='admin']");

  // عناصر خاصة بالكاشير
  const cashierOnly = document.querySelectorAll("[data-role='cashier']");

  if (role === "cashier") {
    adminOnly.forEach(el => el.style.display = "none");
  }

  if (role === "admin") {
    cashierOnly.forEach(el => el.style.display = "none");
  }
});
