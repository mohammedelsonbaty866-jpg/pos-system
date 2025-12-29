// ===== ROLE GUARD =====
// owner | cashier

const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
  location.href = "login.html";
}

// منع الكاشير من دخول الإعدادات
if (location.pathname.includes("settings.html")) {
  if (user.role !== "owner") {
    alert("غير مسموح بالدخول");
    location.href = "index.html";
  }
}
